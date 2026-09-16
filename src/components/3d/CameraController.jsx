import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CameraController:
 * Maps scroll progress (0 -> 1) continuously into 3D camera travel path:
 *
 * 0.00: Outside storefront (z=12.5, y=0.3, looking at shop facade and signage)
 * 0.20: Approaching storefront facade
 * 0.35: Right in front of glass entrance doors (doors begin swinging open)
 * 0.48: Crossing through the doorway
 * 0.65: Inside walk-in showroom wardrobe, viewing hanging coats and slatted walls
 * 0.82: Moving directly toward central NEARLY discovery station
 * 0.95 -> 1.00: Approaching the terminal screen before 3D transitions smoothly into 2D UI
 */
export function CameraController({ scrollProgress, mouseRef }) {
  const { camera, size } = useThree()
  const targetCamPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame(() => {
    const p = THREE.MathUtils.clamp(scrollProgress.current, 0, 1)

    // Aspect ratio adaptation: mobile portrait vs desktop landscape
    const aspect = size.width / Math.max(size.height, 1)
    const isMobileAspect = aspect < 1.0
    // On narrow screens, pull camera back slightly so storefront & kiosk fit naturally
    const zOffset = isMobileAspect ? 2.2 : 0.0

    // Gentle mouse parallax (quiet, subtle, premium - disabled on touch devices)
    const mx = isMobileAspect ? 0 : (mouseRef.current?.x || 0) * 0.35
    const my = isMobileAspect ? 0 : (mouseRef.current?.y || 0) * 0.2

    // Continuous 3D camera path definition
    if (p < 0.35) {
      // Act 1: Outside storefront -> Approach doors
      const t = p / 0.35
      const camZ = THREE.MathUtils.lerp(12.5 + zOffset, 3.2, t)
      const camY = THREE.MathUtils.lerp(0.4, 0.1, t)
      const camX = Math.sin(t * Math.PI * 0.5) * (isMobileAspect ? 0.15 : 0.3)

      targetCamPos.current.set(camX + mx, camY + my, camZ)
      targetLookAt.current.set(0, THREE.MathUtils.lerp(1.2, 0.2, t), 0)
    } else if (p < 0.55) {
      // Crossing doorway: z goes from 3.2 to -2.5
      const t = (p - 0.35) / 0.20
      const camZ = THREE.MathUtils.lerp(3.2, -2.5, t)
      const camY = THREE.MathUtils.lerp(0.1, 0.0, t)
      const camX = THREE.MathUtils.lerp(0.3, 0.0, t)

      targetCamPos.current.set(camX + mx * 0.6, camY + my * 0.6, camZ)
      targetLookAt.current.set(0, 0.0, -8.0)
    } else if (p < 0.78) {
      // Act 02: Walking inside showroom, taking in the wardrobe interior
      const t = (p - 0.55) / 0.23
      const camZ = THREE.MathUtils.lerp(-2.5, -10.8, t)
      const camY = THREE.MathUtils.lerp(0.0, 0.1, t)
      const camX = Math.sin(t * Math.PI) * (isMobileAspect ? 0.2 : 0.4)

      targetCamPos.current.set(camX + mx * 0.5, camY + my * 0.5, camZ)
      targetLookAt.current.set(0, 0.35, -15.5)
    } else {
      // Act 03: Approaching the NEARLY discovery station screen (z=-15.5) and STOPPING at the interactive terminal
      const t = THREE.MathUtils.clamp((p - 0.78) / 0.22, 0, 1)
      const camZ = THREE.MathUtils.lerp(-10.8, isMobileAspect ? -13.2 : -13.85, t)
      const camY = THREE.MathUtils.lerp(0.1, isMobileAspect ? 0.65 : 0.55, t)
      const camX = THREE.MathUtils.lerp(0.0, 0.0, t)

      targetCamPos.current.set(camX + mx * 0.2, camY + my * 0.2, camZ)
      targetLookAt.current.set(0, 0.55, -15.5)
    }

    // Smooth camera interpolation
    camera.position.lerp(targetCamPos.current, 0.08)

    // Current camera lookAt target smoothing
    const currentLook = new THREE.Vector3(0, 0, -1)
    currentLook.applyQuaternion(camera.quaternion).add(camera.position)
    currentLook.lerp(targetLookAt.current, 0.08)
    camera.lookAt(currentLook)
  })

  return null
}


