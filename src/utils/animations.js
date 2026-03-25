export const easingSmooth = [0.22, 1, 0.36, 1]

export const pageTransition = {
  initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: easingSmooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(6px)',
    transition: { duration: 0.28, ease: 'easeOut' },
  },
}

export const revealUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easingSmooth },
  },
}

export const revealScale = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.48, ease: easingSmooth },
  },
}

export const tabPanelTransition = {
  initial: { opacity: 0, y: 26, scale: 0.985, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easingSmooth },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.99,
    filter: 'blur(8px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

export const floatingPanel = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: easingSmooth },
  },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const hoverLift = {
  y: -4,
  scale: 1.015,
  transition: { duration: 0.22, ease: 'easeOut' },
}

export const tapPress = {
  scale: 0.985,
  transition: { duration: 0.15, ease: 'easeOut' },
}
