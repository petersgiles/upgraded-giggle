 // This function will use the given hex color and determine which of the provided light or dark colors
 // gives maximum contrast, and return that color
 export function getContrastYIQ(hexcolor: string, light: string = '#ffffff', dark: string = '#000000'): string {
    hexcolor = (hexcolor) ? hexcolor.replace('#', '') : ''
    const foreground = getContrastYIQDiff(hexcolor)
    const darkBackground = (Math.abs(foreground - getContrastYIQDiff(dark)))
    const lightBackground = (Math.abs(foreground - getContrastYIQDiff(light)))
    return (darkBackground > lightBackground) ? dark : light
  }

  export function  getContrastYIQDiff(hexcolor: string): number {
    hexcolor = (hexcolor) ? hexcolor.replace('#', '') : ''
    const r = parseInt(hexcolor.substr(0, 2), 16)
    const g = parseInt(hexcolor.substr(2, 2), 16)
    const b = parseInt(hexcolor.substr(4, 2), 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return yiq
  }