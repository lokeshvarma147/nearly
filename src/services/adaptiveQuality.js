/**
 * Adaptive Device Quality Detection
 * Detects device hardware profile and assigns rendering tier:
 * - 'high': Desktop GPU / Flagship
 * - 'medium': Laptops / High-end tablets & phones
 * - 'low': Budget / low-end phones (e.g. ₹10k Android)
 * - 'fallback': Devices with failing WebGL or disabled 3D
 */

export function detectDeviceQuality() {
  if (typeof window === 'undefined') return { tier: 'medium', dpr: 1, isMobile: false }

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768

  // Check WebGL support
  let gl = null
  let maxTextureSize = 2048
  let rendererString = ''
  try {
    const canvas = document.createElement('canvas')
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
      }
    }
  } catch {
    gl = null
  }

  if (!gl) {
    return {
      tier: 'fallback',
      dpr: 1,
      isMobile,
      maxTextureSize: 1024,
      enableShadows: false,
      enableHighResTextures: false,
      useReducedLighting: true,
    }
  }

  const concurrency = navigator.hardwareConcurrency || 4
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
  const isWeakGPU = /Mali-4|Mali-T|Adreno \(TM\) 3|Adreno \(TM\) 50|PowerVR/i.test(rendererString)

  let tier = 'high'

  if (isMobile) {
    if (concurrency <= 4 || maxTextureSize <= 4096 || isWeakGPU || window.innerWidth < 420) {
      tier = 'low'
    } else {
      tier = 'medium'
    }
  } else {
    if (concurrency <= 4 || maxTextureSize <= 4096 || isWeakGPU) {
      tier = 'medium'
    } else {
      tier = 'high'
    }
  }

  return {
    tier,
    dpr: tier === 'low' ? 1 : tier === 'medium' ? Math.min(dpr, 1.25) : dpr,
    isMobile,
    maxTextureSize: tier === 'low' ? 512 : tier === 'medium' ? 1024 : 2048,
    enableShadows: tier === 'high',
    enableHighResTextures: tier === 'high',
    useReducedLighting: tier === 'low',
  }
}
