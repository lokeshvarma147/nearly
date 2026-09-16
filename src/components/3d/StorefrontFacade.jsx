import { useMemo } from 'react'
import * as THREE from 'three'
import { getPlasterWallTexture, getWoodTexture } from './textures'

// Procedural high-end boutique storefront signage
function createStorefrontSignTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Dark architectural bronze/charcoal fascia panel
  ctx.fillStyle = '#17191E'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Brushed bronze inner border
  ctx.strokeStyle = '#C8A870'
  ctx.lineWidth = 4
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32)

  // Thin outer gold rule
  ctx.strokeStyle = '#8E7348'
  ctx.lineWidth = 1.5
  ctx.strokeRect(26, 26, canvas.width - 52, canvas.height - 52)

  // Brand Name "NEARLY" in crisp warm serif typography
  ctx.fillStyle = '#F5EFE6'
  ctx.font = '600 76px "Playfair Display", serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.letterSpacing = '12px'
  ctx.fillText('NEARLY', canvas.width / 2, canvas.height / 2 - 14)

  // Subtitle "PHYSICAL RETAIL DISCOVERY"
  ctx.fillStyle = '#C8A870'
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif'
  ctx.letterSpacing = '8px'
  ctx.fillText('PHYSICAL RETAIL DISCOVERY', canvas.width / 2, canvas.height / 2 + 52)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function StorefrontFacade() {
  const signTexture = useMemo(() => createStorefrontSignTexture(), [])
  const plasterTex = useMemo(() => getPlasterWallTexture({ color: '#181A1F' }), [])
  const displayWoodTex = useMemo(() => getWoodTexture({ color: '#3A2B1E' }), [])

  return (
    <group position={[0, 0, 0]}>
      {/* --- Main Storefront Outer Frame (Charcoal Honed Stone) --- */}
      {/* Top Lintel Beam */}
      <mesh position={[0, 4.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[14.2, 1.4, 0.9]} />
        <meshStandardMaterial map={plasterTex} color="#22252B" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Left Outer Pillar */}
      <mesh position={[-6.6, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 8.8, 0.9]} />
        <meshStandardMaterial map={plasterTex} color="#22252B" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Right Outer Pillar */}
      <mesh position={[6.6, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 8.8, 0.9]} />
        <meshStandardMaterial map={plasterTex} color="#22252B" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Architectural Exterior Wall Flankers (Extending building sides) */}
      <mesh position={[-11, 0.5, -0.4]} receiveShadow>
        <boxGeometry args={[7.5, 8.8, 0.4]} />
        <meshStandardMaterial map={plasterTex} color="#15171B" roughness={0.85} />
      </mesh>
      <mesh position={[11, 0.5, -0.4]} receiveShadow>
        <boxGeometry args={[7.5, 8.8, 0.4]} />
        <meshStandardMaterial map={plasterTex} color="#15171B" roughness={0.85} />
      </mesh>

      {/* Pavement / Street Curb outside with natural stone tone */}
      <mesh position={[0, -2.15, 4.2]} receiveShadow>
        <boxGeometry args={[22, 0.5, 12]} />
        <meshStandardMaterial color="#1C1E23" roughness={0.88} metalness={0.08} />
      </mesh>
      {/* Sidewalk curb stone border */}
      <mesh position={[0, -1.85, 9.8]}>
        <boxGeometry args={[22, 0.15, 0.4]} />
        <meshStandardMaterial color="#2E323A" roughness={0.8} />
      </mesh>

      {/* Store Signboard / Fascia (Illuminated premium boutique signage) */}
      <group position={[0, 3.25, 0.44]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[11.6, 1.75, 0.12]} />
          <meshStandardMaterial
            map={signTexture}
            roughness={0.35}
            metalness={0.2}
            emissive="#FAF5ED"
            emissiveIntensity={0.08}
          />
        </mesh>
        {/* Bronze perimeter molding */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[11.75, 1.9, 0.04]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Backlight halo glow casting down on entrance */}
        <pointLight position={[0, -0.6, 0.4]} intensity={1.8} distance={6} color="#FFE6C0" />
      </group>

      {/* Architectural Awning Bar */}
      <mesh position={[0, 2.22, 0.6]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 11.8, 24]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* --- Large Boutique Display Windows (Left & Right) --- */}
      {/* Left Window Outer Bronze Mullion Frame */}
      <mesh position={[-3.8, 0.1, 0.12]}>
        <boxGeometry args={[4.05, 4.05, 0.08]} />
        <meshStandardMaterial color="#23201C" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Left Window Glass Pane */}
      <mesh position={[-3.8, 0.1, 0.14]}>
        <boxGeometry args={[3.85, 3.85, 0.04]} />
        <meshPhysicalMaterial
          color="#B8CCD8"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.06}
          ior={1.52}
          reflectivity={0.65}
          thickness={0.08}
        />
      </mesh>
      {/* Left Window Base Sill */}
      <mesh position={[-3.8, -1.65, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.65, 0.45]} />
        <meshStandardMaterial color="#17181C" roughness={0.65} metalness={0.3} />
      </mesh>

      {/* Right Window Outer Bronze Mullion Frame */}
      <mesh position={[3.8, 0.1, 0.12]}>
        <boxGeometry args={[4.05, 4.05, 0.08]} />
        <meshStandardMaterial color="#23201C" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Right Window Glass Pane */}
      <mesh position={[3.8, 0.1, 0.14]}>
        <boxGeometry args={[3.85, 3.85, 0.04]} />
        <meshPhysicalMaterial
          color="#B8CCD8"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.06}
          ior={1.52}
          reflectivity={0.65}
          thickness={0.08}
        />
      </mesh>
      {/* Right Window Base Sill */}
      <mesh position={[3.8, -1.65, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.65, 0.45]} />
        <meshStandardMaterial color="#17181C" roughness={0.65} metalness={0.3} />
      </mesh>

      {/* --- Left Window Boutique Display: Mannequin in Tailored Coat & Pedestal --- */}
      <group position={[-3.8, -0.4, -0.9]}>
        {/* Walnut display pedestal */}
        <mesh position={[0, -0.62, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.45, 1.3]} />
          <meshStandardMaterial map={displayWoodTex} roughness={0.5} />
        </mesh>

        {/* Mannequin stand base */}
        <mesh position={[-0.75, -0.38, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.04, 24]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-0.75, 0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Tailored coat mannequin torso (Boutique silhouette) */}
        <mesh position={[-0.75, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.32, 1.1, 16]} />
          <meshStandardMaterial color="#2B2825" roughness={0.7} />
        </mesh>
        {/* Coat collar lapel accents */}
        <mesh position={[-0.75, 0.95, 0.1]}>
          <boxGeometry args={[0.28, 0.22, 0.08]} />
          <meshStandardMaterial color="#181716" roughness={0.6} />
        </mesh>

        {/* Small folded garment display stacks on right side of pedestal */}
        <group position={[0.7, -0.32, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 0.09, 0.5]} />
            <meshStandardMaterial color="#E6E0D5" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.66, 0.08, 0.48]} />
            <meshStandardMaterial color="#8C7764" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.17, 0]} castShadow>
            <boxGeometry args={[0.64, 0.07, 0.46]} />
            <meshStandardMaterial color="#2E3038" roughness={0.8} />
          </mesh>
        </group>

        {/* Warm overhead showcase spotlight */}
        <pointLight position={[-0.2, 1.7, 0.4]} intensity={2.2} distance={4.5} color="#FFE6BD" />
        <mesh position={[-0.2, 1.9, 0.2]}>
          <cylinderGeometry args={[0.06, 0.18, 0.28, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* --- Right Window Showcase: Evening Gown Mannequin & Sculptural Display --- */}
      <group position={[3.8, -0.4, -0.9]}>
        {/* Walnut display pedestal */}
        <mesh position={[0, -0.62, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.45, 1.3]} />
          <meshStandardMaterial map={displayWoodTex} roughness={0.5} />
        </mesh>

        {/* Mannequin stand base */}
        <mesh position={[0.7, -0.38, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.04, 24]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.3, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Cream silk evening dress silhouette */}
        <mesh position={[0.7, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.36, 1.25, 16]} />
          <meshStandardMaterial color="#EFECE6" roughness={0.55} />
        </mesh>

        {/* Accessory display block with perfume/jewelry boutique item */}
        <group position={[-0.65, -0.28, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.45, 0.22, 0.45]} />
            <meshStandardMaterial color="#1C1E24" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 0.16, 16]} />
            <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Warm overhead showcase spotlight */}
        <pointLight position={[0.3, 1.7, 0.4]} intensity={2.2} distance={4.5} color="#FFE6BD" />
        <mesh position={[0.3, 1.9, 0.2]}>
          <cylinderGeometry args={[0.06, 0.18, 0.28, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Store Entrance Transom Window above door */}
      <mesh position={[0, 1.7, 0.12]}>
        <boxGeometry args={[2.8, 0.72, 0.04]} />
        <meshPhysicalMaterial
          color="#B8CCD8"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.06}
        />
      </mesh>
      {/* Transom bronze frame divider */}
      <mesh position={[0, 1.34, 0.14]}>
        <boxGeometry args={[2.84, 0.07, 0.12]} />
        <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
}

