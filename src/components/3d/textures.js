import * as THREE from 'three'

// Cached textures to prevent duplicate allocations
const textureCache = new Map()

/**
 * Generate subtle woodgrain texture for dark walnut / oak shelving and wardrobes
 */
export function getWoodTexture({ color = '#2E2218', streakColor = '#1C150E', width = 512, height = 512 } = {}) {
  const key = `wood_${color}_${streakColor}_${width}`
  if (textureCache.has(key)) return textureCache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Base tone
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  // Organic vertical wood fibers and streaks
  for (let i = 0; i < 750; i++) {
    const x = Math.random() * width
    const w = 1 + Math.random() * 3
    const alpha = 0.05 + Math.random() * 0.12
    ctx.fillStyle = streakColor
    ctx.globalAlpha = alpha
    ctx.fillRect(x, 0, w, height)
  }

  // Soft horizontal grain wave rings
  ctx.globalAlpha = 0.04
  ctx.fillStyle = '#E8C59A'
  for (let y = 0; y < height; y += 32) {
    ctx.fillRect(0, y + Math.sin(y * 0.05) * 6, width, 4)
  }

  ctx.globalAlpha = 1.0

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  textureCache.set(key, tex)
  return tex
}

/**
 * Generate luxury dark oak herringbone / chevron parquet floor texture
 */
export function getParquetTexture({ width = 1024, height = 1024 } = {}) {
  const key = `parquet_${width}_${height}`
  if (textureCache.has(key)) return textureCache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Base dark floor tone
  ctx.fillStyle = '#261C14'
  ctx.fillRect(0, 0, width, height)

  // Herringbone plank pattern
  const plankW = 64
  const plankH = 256
  const cols = Math.ceil(width / plankW) + 2
  const rows = Math.ceil(height / plankH) + 2

  const plankShades = ['#2A1F17', '#34261C', '#231913', '#392A1F', '#2D2119']

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const isAlt = (c + r) % 2 === 0
      const x = c * plankW
      const y = r * plankH

      ctx.save()
      ctx.translate(x, y)
      if (isAlt) {
        ctx.rotate((45 * Math.PI) / 180)
      } else {
        ctx.rotate((-45 * Math.PI) / 180)
      }

      ctx.fillStyle = plankShades[Math.floor(Math.random() * plankShades.length)]
      ctx.fillRect(-plankW / 2, -plankH / 2, plankW - 2, plankH - 2)

      // Subtle bevel line
      ctx.strokeStyle = '#120C08'
      ctx.lineWidth = 1.5
      ctx.strokeRect(-plankW / 2, -plankH / 2, plankW - 2, plankH - 2)

      // Wood fiber micro-streaks on each plank
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      for (let s = 0; s < 6; s++) {
        ctx.fillRect(-plankW / 2 + s * 9, -plankH / 2, 2, plankH)
      }

      ctx.restore()
    }
  }

  // Soft ambient vignette across floor
  const grad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width / 1.4)
  grad.addColorStop(0, 'rgba(255,230,190,0.03)')
  grad.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(4, 8)
  textureCache.set(key, tex)
  return tex
}

/**
 * Generate architectural plaster / honed stone wall texture
 */
export function getPlasterWallTexture({ color = '#1E2025', width = 512, height = 512 } = {}) {
  const key = `plaster_${color}_${width}`
  if (textureCache.has(key)) return textureCache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  // Stippled noise micro-texture for realistic matte plaster
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const lum = Math.random() > 0.5 ? 255 : 0
    const alpha = 0.02 + Math.random() * 0.03
    ctx.fillStyle = `rgba(${lum},${lum},${lum},${alpha})`
    ctx.fillRect(x, y, 1.5, 1.5)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3, 3)
  textureCache.set(key, tex)
  return tex
}

/**
 * Generate fabric micro-weave texture for garments
 */
export function getFabricTexture({ color = '#3A3D44', width = 256, height = 256 } = {}) {
  const key = `fabric_${color}_${width}`
  if (textureCache.has(key)) return textureCache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  // Crosshatch weave
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  for (let x = 0; x < width; x += 4) {
    ctx.fillRect(x, 0, 1.5, height)
  }
  ctx.fillStyle = 'rgba(0,0,0,0.06)'
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1.5)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 4)
  textureCache.set(key, tex)
  return tex
}
