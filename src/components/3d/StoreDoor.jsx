import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * StoreDoor component:
 * Physical double glass boutique doors with dark architectural bronze frames and vertical pull handles.
 * Rotates open inwards smoothly as scrollProgress crosses 0.32 through 0.52.
 */
export function StoreDoor({ scrollProgress }) {
  const leftDoorHingeRef = useRef()
  const rightDoorHingeRef = useRef()

  useFrame(() => {
    const p = scrollProgress.current

    // Door starts opening naturally when approaching doors (0.34) and settles open as camera enters (0.50)
    const doorOpenT = THREE.MathUtils.clamp((p - 0.34) / (0.50 - 0.34), 0, 1)
    // Smooth pneumatic door damping
    const easeDoor = doorOpenT * doorOpenT * (3 - 2 * doorOpenT)

    // Swing inward naturally (approx 78 degrees max) strictly on Y axis
    const maxAngle = Math.PI * 0.42
    if (leftDoorHingeRef.current) {
      leftDoorHingeRef.current.rotation.y = -easeDoor * maxAngle
    }
    if (rightDoorHingeRef.current) {
      rightDoorHingeRef.current.rotation.y = easeDoor * maxAngle
    }
  })

  const doorWidth = 1.35
  const doorHeight = 2.65
  const doorThickness = 0.05

  return (
    <group position={[0, -0.05, 0.1]}>
      {/* Outer Door Surrounding Jamb / Frame */}
      <mesh position={[-1.4, 0, 0]}>
        <boxGeometry args={[0.08, doorHeight + 0.1, 0.2]} />
        <meshStandardMaterial color="#17181C" roughness={0.35} metalness={0.75} />
      </mesh>
      <mesh position={[1.4, 0, 0]}>
        <boxGeometry args={[0.08, doorHeight + 0.1, 0.2]} />
        <meshStandardMaterial color="#17181C" roughness={0.35} metalness={0.75} />
      </mesh>

      <mesh position={[0, doorHeight / 2 + 0.05, 0]}>
        <boxGeometry args={[2.88, 0.08, 0.2]} />
        <meshStandardMaterial color="#17181C" roughness={0.35} metalness={0.75} />
      </mesh>

      {/* Threshold Brass Strip on Floor */}
      <mesh position={[0, -doorHeight / 2, 0]}>
        <boxGeometry args={[2.84, 0.04, 0.32]} />
        <meshStandardMaterial color="#C8A870" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* --- Left Door Leaf (Hinged at x = -1.35) --- */}
      <group ref={leftDoorHingeRef} position={[-doorWidth, 0, 0]}>
        {/* Door body offset by +doorWidth/2 so pivot is on the hinge edge */}
        <group position={[doorWidth / 2, 0, 0]}>
          {/* Glass Pane */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[doorWidth - 0.12, doorHeight - 0.12, doorThickness]} />
            <meshPhysicalMaterial
              color="#ADC0CA"
              transmission={0.92}
              opacity={1}
              transparent
              roughness={0.06}
              ior={1.5}
              reflectivity={0.65}
              thickness={0.08}
            />
          </mesh>

          {/* Left Door Outer Perimeter Metal Frame */}
          <mesh>
            <boxGeometry args={[doorWidth, doorHeight, 0.07]} />
            <meshStandardMaterial color="#181A20" metalness={0.7} roughness={0.35} />
          </mesh>

          {/* Kick plate panel with bronze accent trim */}
          <mesh position={[0, -0.98, 0.02]}>
            <boxGeometry args={[doorWidth - 0.08, 0.42, 0.05]} />
            <meshStandardMaterial color="#131418" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.76, 0.035]}>
            <boxGeometry args={[doorWidth - 0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Vertical Architectural Brass Pull Handle (Exterior & Interior) */}
          <group position={[doorWidth / 2 - 0.14, 0, 0]}>
            <mesh position={[0, 0, 0.065]} castShadow>
              <cylinderGeometry args={[0.016, 0.016, 1.05, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.18} />
            </mesh>
            {/* Handle standoff mounts */}
            <mesh position={[0, 0.42, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} />
            </mesh>
            <mesh position={[0, -0.42, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} />
            </mesh>
            {/* Interior handle */}
            <mesh position={[0, 0, -0.065]}>
              <cylinderGeometry args={[0.016, 0.016, 1.05, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.18} />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- Right Door Leaf (Hinged at x = +1.35) --- */}
      <group ref={rightDoorHingeRef} position={[doorWidth, 0, 0]}>
        {/* Door body offset by -doorWidth/2 so pivot is on the hinge edge */}
        <group position={[-doorWidth / 2, 0, 0]}>
          {/* Glass Pane */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[doorWidth - 0.12, doorHeight - 0.12, doorThickness]} />
            <meshPhysicalMaterial
              color="#ADC0CA"
              transmission={0.92}
              opacity={1}
              transparent
              roughness={0.06}
              ior={1.5}
              reflectivity={0.65}
              thickness={0.08}
            />
          </mesh>

          {/* Right Door Outer Perimeter Metal Frame */}
          <mesh>
            <boxGeometry args={[doorWidth, doorHeight, 0.07]} />
            <meshStandardMaterial color="#181A20" metalness={0.7} roughness={0.35} />
          </mesh>

          {/* Kick plate panel with bronze accent trim */}
          <mesh position={[0, -0.98, 0.02]}>
            <boxGeometry args={[doorWidth - 0.08, 0.42, 0.05]} />
            <meshStandardMaterial color="#131418" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.76, 0.035]}>
            <boxGeometry args={[doorWidth - 0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Vertical Architectural Brass Pull Handle */}
          <group position={[-doorWidth / 2 + 0.14, 0, 0]}>
            <mesh position={[0, 0, 0.065]} castShadow>
              <cylinderGeometry args={[0.016, 0.016, 1.05, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.18} />
            </mesh>
            {/* Handle standoff mounts */}
            <mesh position={[0, 0.42, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} />
            </mesh>
            <mesh position={[0, -0.42, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} />
            </mesh>
            {/* Interior handle */}
            <mesh position={[0, 0, -0.065]}>
              <cylinderGeometry args={[0.016, 0.016, 1.05, 16]} />
              <meshStandardMaterial color="#C8A870" metalness={0.9} roughness={0.18} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

