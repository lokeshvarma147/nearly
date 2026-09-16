import { useMemo } from 'react'
import * as THREE from 'three'
import { getParquetTexture, getWoodTexture, getPlasterWallTexture, getFabricTexture } from './textures'

/**
 * Fashion Wardrobe & Showroom Interior (Act 02 - Inspired by luxury fashion boutique)
 *
 * Rich environmental features:
 * - Luxury dark oak herringbone parquet flooring
 * - Fluted dark walnut vertical rib accent back wall
 * - Built-in LED backlit glass wardrobes (left & right)
 * - Detailed garment silhouettes: Tailored blazers/coats, silk midi dresses, shirts on hangers
 * - Folded knitwear stacks on warm wood shelves
 * - Central retail display island with boutique decor
 * - Warm, readable showroom lighting avoiding pitch-black areas
 */
export function InteriorShowroom() {
  const parquetTex = useMemo(() => getParquetTexture(), [])
  const woodTex = useMemo(() => getWoodTexture({ color: '#322318' }), [])
  const wallTex = useMemo(() => getPlasterWallTexture({ color: '#1A1C20' }), [])
  const coatFabricTex = useMemo(() => getFabricTexture({ color: '#2B2E36' }), [])
  const dressFabricTex = useMemo(() => getFabricTexture({ color: '#DDD6CC' }), [])

  // Restrained luxury boutique color palette: charcoal, oat cream, olive, camel, soft ivory, navy
  const coatColors = ['#1D1E22', '#C7BCB0', '#3E4436', '#7D6A56', '#262D38', '#E6E2D8', '#423B33']
  const dressColors = ['#EAE4D9', '#222328', '#A99B89', '#474D3F', '#D1C7BA', '#1B1C20']

  return (
    <group position={[0, 0, -8]}>
      {/* --- Interior Floor: Luxury Herringbone Parquet Plank Sheen --- */}
      <mesh position={[0, -1.9, 0]} receiveShadow>
        <boxGeometry args={[14.2, 0.1, 26]} />
        <meshStandardMaterial
          map={parquetTex}
          roughness={0.42}
          metalness={0.12}
        />
      </mesh>

      {/* --- Interior Ceiling with Recessed LED Cove Lines --- */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14.2, 0.1, 26]} />
        <meshStandardMaterial color="#121316" roughness={0.85} />
      </mesh>
      {/* Recessed Warm Ceiling Light Troughs */}
      <mesh position={[-2.8, 4.34, 0]}>
        <boxGeometry args={[0.2, 0.04, 22]} />
        <meshStandardMaterial emissive="#FFE5C4" emissiveIntensity={1.2} color="#FFE5C4" />
      </mesh>
      <mesh position={[2.8, 4.34, 0]}>
        <boxGeometry args={[0.2, 0.04, 22]} />
        <meshStandardMaterial emissive="#FFE5C4" emissiveIntensity={1.2} color="#FFE5C4" />
      </mesh>

      {/* --- Back Architectural Wall: Fluted Walnut Paneling & Ambient Glow --- */}
      <mesh position={[0, 1.25, -12.1]} receiveShadow>
        <boxGeometry args={[14.2, 6.2, 0.3]} />
        <meshStandardMaterial map={woodTex} color="#261C14" roughness={0.65} />
      </mesh>

      {/* Fluted Vertical Wood Slats across back feature wall */}
      {Array.from({ length: 32 }).map((_, i) => (
        <mesh key={`flute-${i}`} position={[-6.8 + i * 0.44, 1.25, -11.92]} castShadow>
          <boxGeometry args={[0.07, 6.2, 0.09]} />
          <meshStandardMaterial color="#1A130E" roughness={0.45} />
        </mesh>
      ))}

      {/* Back wall warm accent cove strip */}
      <mesh position={[0, 3.8, -11.85]}>
        <boxGeometry args={[13.5, 0.05, 0.08]} />
        <meshStandardMaterial emissive="#FFD9AA" emissiveIntensity={1.6} color="#FFD9AA" />
      </mesh>

      {/* --- Left Wardrobe: Tailored Coats, Blazers & Folded Shelving --- */}
      <group position={[-3.85, 0.8, -3.2]}>
        {/* Dark bronze metal outer frame structure */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[2.8, 4.8, 8.2]} />
          <meshStandardMaterial map={wallTex} color="#15171B" roughness={0.5} />
        </mesh>

        {/* Back panel of wardrobe with warm walnut lining */}
        <mesh position={[-1.35, 0.4, 0]}>
          <boxGeometry args={[0.05, 4.6, 8.0]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>

        {/* Tinted glass partition door */}
        <mesh position={[1.42, 0.4, 0]}>
          <boxGeometry args={[0.03, 4.6, 8.0]} />
          <meshPhysicalMaterial
            color="#CAD9E0"
            transmission={0.88}
            opacity={1}
            transparent
            roughness={0.08}
            ior={1.48}
            reflectivity={0.6}
          />
        </mesh>

        {/* Warm LED Backlight Strips behind hanging rails */}
        <mesh position={[-1.3, 2.65, 0]}>
          <boxGeometry args={[0.04, 0.04, 7.8]} />
          <meshStandardMaterial emissive="#FFE8C7" emissiveIntensity={2.2} color="#FFE8C7" />
        </mesh>
        <mesh position={[-1.3, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.04, 7.8]} />
          <meshStandardMaterial emissive="#FFE8C7" emissiveIntensity={1.8} color="#FFE8C7" />
        </mesh>

        {/* Top Wardrobe Rail */}
        <mesh position={[0, 2.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 7.6, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Hanging Garments (Left Wardrobe: Tailored coats and blazers) */}
        {Array.from({ length: 9 }).map((_, i) => {
          const col = coatColors[i % coatColors.length]
          const zOffset = -3.2 + i * 0.78
          return (
            <group key={`coat-l-${i}`} position={[0, 1.25, zOffset]}>
              {/* Triangular wooden hanger */}
              <mesh position={[0, 0.88, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.18, 8]} />
                <meshStandardMaterial color="#C8A870" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.78, 0]}>
                <boxGeometry args={[0.12, 0.03, 0.44]} />
                <meshStandardMaterial map={woodTex} color="#5C422C" roughness={0.4} />
              </mesh>

              {/* Garment Body (Tailored coat silhouette with shoulder pads and drape) */}
              <mesh position={[0, 0.1, 0]} castShadow>
                <boxGeometry args={[0.16, 1.35, 0.48]} />
                <meshStandardMaterial
                  map={coatFabricTex}
                  color={col}
                  roughness={0.75}
                />
              </mesh>

              {/* Blazer lapel cutouts for realistic silhouette */}
              <mesh position={[0.085, 0.4, 0]}>
                <boxGeometry args={[0.02, 0.45, 0.3]} />
                <meshStandardMaterial color={col} roughness={0.8} />
              </mesh>
            </group>
          )
        })}

        {/* Middle Wooden Divider Shelf */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.06, 7.8]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>

        {/* Lower Built-in Drawers & Shelves */}
        <mesh position={[0, -1.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.95, 7.8]} />
          <meshStandardMaterial map={woodTex} color="#4A3423" roughness={0.55} />
        </mesh>
        {/* Drawer face lines & bronze handles */}
        {[-2.4, -0.8, 0.8, 2.4].map((z, idx) => (
          <group key={`drawer-l-${idx}`} position={[1.31, -1.15, z]}>
            <mesh>
              <boxGeometry args={[0.02, 0.03, 1.45]} />
              <meshStandardMaterial color="#1E150E" />
            </mesh>
            {/* Bronze drawer pull bar */}
            <mesh position={[0.015, 0, 0]}>
              <boxGeometry args={[0.015, 0.02, 0.35]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* --- Right Wardrobe: Silk Dresses, Shirts & Folded Stacks on Shelves --- */}
      <group position={[3.85, 0.8, -3.2]}>
        {/* Dark metal outer frame */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[2.8, 4.8, 8.2]} />
          <meshStandardMaterial map={wallTex} color="#15171B" roughness={0.5} />
        </mesh>

        {/* Back panel */}
        <mesh position={[1.35, 0.4, 0]}>
          <boxGeometry args={[0.05, 4.6, 8.0]} />
          <meshStandardMaterial map={woodTex} roughness={0.5} />
        </mesh>

        {/* Tinted glass sliding partition */}
        <mesh position={[-1.42, 0.4, 0]}>
          <boxGeometry args={[0.03, 4.6, 8.0]} />
          <meshPhysicalMaterial
            color="#CAD9E0"
            transmission={0.88}
            opacity={1}
            transparent
            roughness={0.08}
            ior={1.48}
            reflectivity={0.6}
          />
        </mesh>

        {/* LED warm backlight strip */}
        <mesh position={[1.3, 2.65, 0]}>
          <boxGeometry args={[0.04, 0.04, 7.8]} />
          <meshStandardMaterial emissive="#FFE8C7" emissiveIntensity={2.2} color="#FFE8C7" />
        </mesh>

        {/* Hanging Rail */}
        <mesh position={[0, 2.2, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 6.2, 16]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Hanging Dresses (Right wardrobe: Silk midi dresses with flow) */}
        {Array.from({ length: 7 }).map((_, i) => {
          const col = dressColors[i % dressColors.length]
          const zOffset = -3.2 + i * 0.82
          return (
            <group key={`dress-r-${i}`} position={[0, 1.1, zOffset]}>
              <mesh position={[0, 1.0, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.2, 8]} />
                <meshStandardMaterial color="#C8A870" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.88, 0]}>
                <boxGeometry args={[0.1, 0.025, 0.4]} />
                <meshStandardMaterial map={woodTex} color="#5C422C" roughness={0.4} />
              </mesh>

              {/* Dress Bodice */}
              <mesh position={[0, 0.45, 0]} castShadow>
                <boxGeometry args={[0.14, 0.65, 0.38]} />
                <meshStandardMaterial map={dressFabricTex} color={col} roughness={0.6} />
              </mesh>
              {/* Flowing Dress Skirt */}
              <mesh position={[0, -0.22, 0]} castShadow>
                <cylinderGeometry args={[0.16, 0.24, 0.75, 16]} />
                <meshStandardMaterial map={dressFabricTex} color={col} roughness={0.6} />
              </mesh>
            </group>
          )
        })}

        {/* Built-in Shelving Bay on the forward end (Folded knitwear stacks) */}
        <group position={[0, 0.6, 2.8]}>
          {/* 3 Illuminated wooden shelves */}
          {[0.8, 0.0, -0.8].map((y, sIdx) => (
            <group key={`shelf-${sIdx}`} position={[0, y, 0]}>
              <mesh receiveShadow>
                <boxGeometry args={[2.5, 0.06, 1.8]} />
                <meshStandardMaterial map={woodTex} roughness={0.5} />
              </mesh>
              {/* Undershelf warm LED strip */}
              <mesh position={[0, -0.035, 0.8]}>
                <boxGeometry args={[2.3, 0.02, 0.03]} />
                <meshStandardMaterial emissive="#FFE5C4" emissiveIntensity={2.0} color="#FFE5C4" />
              </mesh>

              {/* Folded garment stacks on each shelf */}
              <group position={[-0.4, 0.1, 0]}>
                <mesh position={[0, 0.04, 0]} castShadow>
                  <boxGeometry args={[0.6, 0.08, 0.5]} />
                  <meshStandardMaterial color="#EAE5DC" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.12, 0]} castShadow>
                  <boxGeometry args={[0.58, 0.08, 0.48]} />
                  <meshStandardMaterial color="#A49280" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.2, 0]} castShadow>
                  <boxGeometry args={[0.56, 0.07, 0.46]} />
                  <meshStandardMaterial color="#2B2D33" roughness={0.8} />
                </mesh>
              </group>

              <group position={[0.4, 0.1, 0]}>
                <mesh position={[0, 0.04, 0]} castShadow>
                  <boxGeometry args={[0.6, 0.08, 0.5]} />
                  <meshStandardMaterial color="#383C45" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.12, 0]} castShadow>
                  <boxGeometry args={[0.58, 0.08, 0.48]} />
                  <meshStandardMaterial color="#55493F" roughness={0.8} />
                </mesh>
              </group>
            </group>
          ))}
        </group>

        {/* Lower Wood Drawers */}
        <mesh position={[0, -1.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.95, 7.8]} />
          <meshStandardMaterial map={woodTex} color="#4A3423" roughness={0.55} />
        </mesh>
      </group>

      {/* --- Central Display Island Table (Luxury Boutique feature) --- */}
      <group position={[0, -0.9, -4.5]}>
        {/* Table Top: Honed dark walnut table */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 3.6]} />
          <meshStandardMaterial map={woodTex} color="#38271B" roughness={0.4} />
        </mesh>
        {/* Bronze edge trim */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.84, 0.09, 3.64]} />
          <meshStandardMaterial color="#C8A870" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Architectural Pedestal Legs */}
        <mesh position={[-0.6, -0.2, -1.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 24]} />
          <meshStandardMaterial color="#17181C" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0.6, -0.2, -1.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 24]} />
          <meshStandardMaterial color="#17181C" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[-0.6, -0.2, 1.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 24]} />
          <meshStandardMaterial color="#17181C" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0.6, -0.2, 1.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 24]} />
          <meshStandardMaterial color="#17181C" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Display Items on Central Island Table */}
        {/* Folded cashmere sweater stacks */}
        <group position={[0, 0.54, -0.8]}>
          <mesh position={[0, 0.04, 0]} castShadow>
            <boxGeometry args={[0.65, 0.09, 0.55]} />
            <meshStandardMaterial color="#E8E2D8" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.13, 0]} castShadow>
            <boxGeometry args={[0.62, 0.08, 0.52]} />
            <meshStandardMaterial color="#7E6C5C" roughness={0.8} />
          </mesh>
        </group>

        {/* Minimalist boutique ceramic vase */}
        <mesh position={[0, 0.72, 0.6]} castShadow>
          <cylinderGeometry args={[0.09, 0.16, 0.44, 24]} />
          <meshStandardMaterial color="#DDD5C7" roughness={0.3} />
        </mesh>
      </group>

      {/* --- Overhead Showroom Architectural Spotlights (Warm, Bright, Readable) --- */}
      <pointLight position={[0, 3.6, -1]} intensity={2.8} distance={14} color="#FFF3E0" />
      <pointLight position={[0, 3.6, -6]} intensity={3.2} distance={16} color="#FFF3E0" />
      <pointLight position={[0, 3.6, -10]} intensity={2.6} distance={14} color="#FFE6C4" />

      {/* Lateral Spotlights aimed directly onto the Wardrobes */}
      <pointLight position={[-2.6, 2.5, -3.5]} intensity={2.2} distance={9} color="#FFE8CA" />
      <pointLight position={[2.6, 2.5, -3.5]} intensity={2.2} distance={9} color="#FFE8CA" />
      <pointLight position={[-2.6, 2.5, -7.5]} intensity={1.8} distance={8} color="#FFE8CA" />
      <pointLight position={[2.6, 2.5, -7.5]} intensity={1.8} distance={8} color="#FFE8CA" />
    </group>
  )
}

