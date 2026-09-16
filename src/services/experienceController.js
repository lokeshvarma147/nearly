/**
 * Single Unified Experience Controller
 * Coordinates scroll progress across Camera, Doors, Showroom, and Terminal
 * without triggering unneeded React state renders on every scroll tick.
 */

class ExperienceController {
  constructor() {
    this.progress = 0
    this.stage = 'outside' // 'outside' | 'entering' | 'showroom' | 'terminal'
    this.listeners = new Set()
    this.stageListeners = new Set()
    this.userLocation = null
    this.quality = null
  }

  setQuality(q) {
    this.quality = q
  }

  setProgress(p) {
    this.progress = Math.max(0, Math.min(1, p))

    // Determine discrete stage transitions
    let newStage = 'outside'
    if (this.progress < 0.35) {
      newStage = 'outside'
    } else if (this.progress < 0.52) {
      newStage = 'entering'
    } else if (this.progress < 0.78) {
      newStage = 'showroom'
    } else {
      newStage = 'terminal'
    }

    if (newStage !== this.stage) {
      this.stage = newStage
      this.notifyStage(newStage)
    }

    // Direct animation callbacks
    this.listeners.forEach((fn) => fn(this.progress, this.stage))
  }

  setUserLocation(loc) {
    this.userLocation = loc
  }

  subscribeProgress(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  subscribeStage(fn) {
    this.stageListeners.add(fn)
    fn(this.stage)
    return () => this.stageListeners.delete(fn)
  }

  notifyStage(stage) {
    this.stageListeners.forEach((fn) => fn(stage))
  }
}

export const experience = new ExperienceController()
