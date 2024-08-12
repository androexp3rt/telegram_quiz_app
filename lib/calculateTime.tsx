export function doubleDigit(s: number) {
  return s < 10 ? `0${s}` : `${s}`
}
export function displayTime(t: number) {
  const h = Math.floor(t / 3600)
  const m = Math.floor(Math.floor(t % 3600) / 60)
  const s = Math.floor(t % 3600) % 60
  const time = `${doubleDigit(h)}:${doubleDigit(m)}:${doubleDigit(s)}`
  return time
}
