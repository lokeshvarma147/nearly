import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { StorefrontFacade } from './3d/StorefrontFacade'
import { StoreDoor } from './3d/StoreDoor'
import { InteriorShowroom } from './3d/InteriorShowroom'
import { DiscoveryStation } from './3d/DiscoveryStation'
import { CameraController } from './3d/CameraController'

export default function Scene3D({ scrollProgress, onTriggerAction, quality }) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const isLow = quality?.tier === 'low'
  const enableShadows = Boolean(quality?.enableShadows)
  const dpr = quality?.dpr || 1.0

  const onPointerMove = (e) => {
    if (quality?.isMobile) return // Disable mouse calculations on mobile
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }

  return (
    <div
      onPointerMove={onPointerMove}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
        background: '#090A0D',
      }}
    >
      <Canvas
        shadows={enableShadows}
        camera={{ position: [0, 0.4, 12.5], fov: 50, near: 0.1, far: 80 }}
        dpr={dpr}
        gl={{
          antialias: !isLow,
          alpha: false,
          powerPreference: isLow ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Warm exterior + interior ambient lighting */}
        <ambientLight intensity={isLow ? 0.7 : 0.5} color="#F5F2EA" />

        {/* Sunlight / Outdoor Street ambience */}
        <directionalLight
          position={[6, 12, 10]}
          intensity={isLow ? 1.0 : 1.3}
          color="#FAF5E8"
          castShadow={enableShadows}
          shadow-mapSize-width={enableShadows ? 1024 : 256}
          shadow-mapSize-height={enableShadows ? 1024 : 256}
        />

        {/* Warm Interior Glow filtering through the storefront */}
        <pointLight position={[0, 2.2, -1]} intensity={2.8} distance={14} color="#FFDCA8" />
        {!isLow && (
          <pointLight position={[0, 2.0, -8]} intensity={3.0} distance={18} color="#FFE6C2" />
        )}

        {/* 3D World Components */}
        <StorefrontFacade scrollProgress={scrollProgress} isLow={isLow} />
        <StoreDoor scrollProgress={scrollProgress} />
        <InteriorShowroom scrollProgress={scrollProgress} isLow={isLow} />
        <DiscoveryStation
          scrollProgress={scrollProgress}
          onTriggerAction={onTriggerAction}
        />

        {/* Scroll-Linked Camera Controller */}
        <CameraController scrollProgress={scrollProgress} mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}


