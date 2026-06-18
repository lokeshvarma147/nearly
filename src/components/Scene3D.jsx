import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Starfield() {
  const ref = useRef()
  const count = 2200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x += delta * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5fd6ff"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  )
}

function Core({ mouse }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.15 + mouse.current.x * 0.4
    ref.current.rotation.x = t * 0.1 + mouse.current.y * 0.3
  })
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.5, 6]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#2ee6d6"
          emissive="#1b6cff"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.38}
          speed={1.6}
          wireframe
        />
      </Icosahedron>
    </Float>
  )
}

export default function Scene3D() {
  const mouse = useRef({ x: 0, y: 0 })
  const onMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  return (
    <div
      onPointerMove={onMove}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto' }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#4f8cff" />
        <pointLight position={[-10, -8, -6]} intensity={0.8} color="#8b5cf6" />
        <Core mouse={mouse} />
        <Starfield />
      </Canvas>
    </div>
  )
}
