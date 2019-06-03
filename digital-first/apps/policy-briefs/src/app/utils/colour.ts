export const hashCode = str => {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  
export const pickColor = (str) => `hsl(${hashCode(str) % 360}, 100%, 80%)`

// This function will use the given hex color and determine which of the provided light or dark colors
 // gives maximum contrast, and return that color
 export function getContrastYIQ(hexcolor: string, light: string = '#ffffff', dark: string = '#000000'): string {
  const validatedhexcolor = (hexcolor) ? hexcolor.replace('#', '') : ''
  const foreground = getContrastYIQDiff(validatedhexcolor)
  const darkBackground = (Math.abs(foreground - getContrastYIQDiff(dark)))
  const lightBackground = (Math.abs(foreground - getContrastYIQDiff(light)))
  return (darkBackground > lightBackground) ? dark : light
}

export function  getContrastYIQDiff(hexcolor: string): number {
  const validatedhexcolor = (hexcolor) ? hexcolor.replace('#', '') : ''
  const r = parseInt(validatedhexcolor.substr(0, 2), 16)
  const g = parseInt(validatedhexcolor.substr(2, 2), 16)
  const b = parseInt(validatedhexcolor.substr(4, 2), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq
}

export function ascii_to_hexa(str) {
  const arr1 = []
  for (let n = 0, l = str.length; n < l; n = n + 1) {
    const hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

export function  getRandomColor(): string {
  const letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let n = 0; n < 6; n = n + 1) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}