import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Canvas texture generator for high-definition 3D kiosk screen
function createStationScreenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 768
  const ctx = canvas.getContext('2d')

  // Screen background: deep obsidian with soft warm radial core
  const grad = ctx.createRadialGradient(512, 384, 80, 512, 384, 520)
  grad.addColorStop(0, '#1E2128')
  grad.addColorStop(1, '#0C0D11')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 768)

  // Architectural bronze bezel line
  ctx.strokeStyle = '#C8A870'
  ctx.lineWidth = 3
  ctx.strokeRect(24, 24, 976, 720)

  // Kiosk hardware status top bar
  ctx.fillStyle = '#0F1014'
  ctx.fillRect(26, 26, 972, 40)
  ctx.fillStyle = '#C8A870'
  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif'
  ctx.textAlign = 'left'
  ctx.letterSpacing = '3px'
  ctx.fillText('● SYSTEM 03 // DISCOVERY KIOSK ONLINE', 50, 52)

  ctx.textAlign = 'right'
  ctx.fillStyle = '#34D399'
  ctx.fillText('50+ BOUTIQUES CONNECTED', 970, 52)

  // Brand Header
  ctx.fillStyle = '#C8A870'
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '6px'
  ctx.fillText('NEARLY DISCOVERY TERMINAL', 512, 130)

  // Core Headline
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 46px "Playfair Display", serif'
  ctx.letterSpacing = '2px'
  ctx.fillText('WHAT ARE YOU LOOKING FOR?', 512, 205)

  ctx.fillStyle = '#9FA4B2'
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif'
  ctx.letterSpacing = '1px'
  ctx.fillText('Choose an action below to explore local physical boutique racks', 512, 252)

  // 3 Actions Cards: SCAN / SEARCH / NEAR ME
  const cards = [
    { id: 'scan', title: 'SCAN', sub: 'VISUAL AI', desc: 'Scan garments in physical space', x: 204 },
    { id: 'search', title: 'SEARCH', sub: 'TEXT & STYLE', desc: 'Describe silhouette or style', x: 512 },
    { id: 'nearby', title: 'NEAR ME', sub: 'MAP RADAR', desc: 'Browse verified boutiques near you', x: 820 },
  ]

  cards.forEach((c) => {
    // Card background
    ctx.fillStyle = '#15171E'
    ctx.fillRect(c.x - 135, 310, 270, 270)

    ctx.strokeStyle = '#2A2E3A'
    ctx.lineWidth = 1.5
    ctx.strokeRect(c.x - 135, 310, 270, 270)

    // Gold accent top bar
    ctx.fillStyle = '#C8A870'
    ctx.fillRect(c.x - 135, 310, 270, 4)

    // Subtitle category
    ctx.fillStyle = '#7D8394'
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif'
    ctx.letterSpacing = '2px'
    ctx.fillText(c.sub, c.x, 360)

    // Button Title [ SCAN ] / [ SEARCH ] / [ NEAR ME ]
    ctx.fillStyle = '#F3F1EC'
    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(c.title, c.x, 420)

    // Button description
    ctx.fillStyle = '#8E94A2'
    ctx.font = '400 15px "Plus Jakarta Sans", sans-serif'
    ctx.letterSpacing = '0.5px'

    const words = c.desc.split(' ')
    const l1 = words.slice(0, 3).join(' ')
    const l2 = words.slice(3).join(' ')
    ctx.fillText(l1, c.x, 480)
    ctx.fillText(l2, c.x, 506)

    // Click prompt pill
    ctx.fillStyle = '#22252F'
    ctx.beginPath()
    ctx.roundRect(c.x - 65, 535, 130, 32, 16)
    ctx.fill()

    ctx.fillStyle = '#A0A6B5'
    ctx.font = '700 13px "Plus Jakarta Sans", sans-serif'
    ctx.letterSpacing = '1px'
    ctx.fillText('TAP TO ENTER', c.x, 556)
  })

  // Bottom hint
  ctx.fillStyle = '#C8A870'
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif'
  ctx.letterSpacing = '4px'
  ctx.fillText('CLICK ANY CARD TO INTERACT DIRECTLY', 512, 680)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

let cachedScreenTexture = null

export function DiscoveryStation({ scrollProgress, onTriggerAction }) {
  const stationRef = useRef()
  const [hoveredCard, setHoveredCard] = useState(null)

  // Single static texture instance — zero texture recreation on hover
  const screenTexture = useMemo(() => {
    if (!cachedScreenTexture) {
      cachedScreenTexture = createStationScreenTexture()
    }
    return cachedScreenTexture
  }, [])


  useFrame((state) => {
    if (!stationRef.current) return
    const p = scrollProgress.current

    // Gentle physical float
    const t = state.clock.getElapsedTime()
    stationRef.current.position.y = -0.1 + Math.sin(t * 1.2) * 0.025

    // Visible from p > 0.55
    const visibility = THREE.MathUtils.clamp((p - 0.55) / 0.25, 0, 1)
    stationRef.current.visible = visibility > 0.02
  })

  // Handle pointer clicks on the 3D screen
  const handlePointerClick = (action) => {
    onTriggerAction?.(action)
  }

  return (
    <group ref={stationRef} position={[0, -0.1, -15.5]}>
      {/* Sleek architectural black metal pedestal base */}
      <mesh position={[0, -1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.95, 1.4, 32]} />
        <meshStandardMaterial color="#141519" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Brushed bronze collar band on pedestal */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.08, 32]} />
        <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Base Floor Light Ring */}
      <mesh position={[0, -1.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.98, 1.06, 32]} />
        <meshStandardMaterial emissive="#C8A870" emissiveIntensity={1.4} color="#C8A870" />
      </mesh>

      {/* Main Terminal Screen Display (Tilted slightly back for ergonomics) */}
      <group position={[0, 0.65, 0]} rotation={[-0.12, 0, 0]}>
        {/* Terminal Screen Back Casing */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.3, 2.45, 0.14]} />
          <meshStandardMaterial color="#101115" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Bronze edge bezel border */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[3.34, 2.49, 0.09]} />
          <meshStandardMaterial color="#C8A870" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Screen Glass Face with Canvas Texture */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[3.12, 2.32]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#FFEED6"
            emissiveIntensity={0.28}
            roughness={0.12}
            metalness={0.08}
          />
        </mesh>

        {/* Clickable 3D Invisible Hitboxes for the 3 buttons with active visual highlight */}
        {/* Button 1: SCAN */}
        <group position={[-0.94, -0.15, 0.08]}>
          {hoveredCard === 'scan' && (
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[0.84, 0.84]} />
              <meshBasicMaterial color="#C8A870" wireframe />
            </mesh>
          )}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              handlePointerClick('scan')
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredCard('scan')
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredCard(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <planeGeometry args={[0.85, 0.85]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>

        {/* Button 2: SEARCH */}
        <group position={[0, -0.15, 0.08]}>
          {hoveredCard === 'search' && (
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[0.84, 0.84]} />
              <meshBasicMaterial color="#C8A870" wireframe />
            </mesh>
          )}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              handlePointerClick('search')
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredCard('search')
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredCard(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <planeGeometry args={[0.85, 0.85]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>

        {/* Button 3: NEAR ME */}
        <group position={[0.94, -0.15, 0.08]}>
          {hoveredCard === 'nearby' && (
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[0.84, 0.84]} />
              <meshBasicMaterial color="#C8A870" wireframe />
            </mesh>
          )}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              handlePointerClick('nearby')
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredCard('nearby')
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredCard(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <planeGeometry args={[0.85, 0.85]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>

        {/* Subtle Ambient Glow Light casting on floor from station */}
        <pointLight position={[0, 0, 0.9]} intensity={2.2} distance={6} color="#FFE5C4" />
      </group>
    </group>
  )
}


