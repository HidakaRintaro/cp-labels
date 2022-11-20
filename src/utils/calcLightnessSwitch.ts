export const calcLightnessSwitch = (colorCode: string): number => {
  return Math.max(0, Math.min((calcPerceivedLightness(colorCode) - 0.453) * -1000, 1))
}

const calcPerceivedLightness = (colorCode: string): number => {
  const r = parseInt(colorCode.substring(0, 2), 16)
  const g = parseInt(colorCode.substring(2, 4), 16)
  const b = parseInt(colorCode.substring(4, 6), 16)
  const perceivedLightness = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
  return perceivedLightness
}
