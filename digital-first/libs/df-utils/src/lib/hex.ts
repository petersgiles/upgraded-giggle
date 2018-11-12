export function hexEncode(text) {
  // utf8 to latin1
  const s = encodeURI(encodeURIComponent(text))
  let h = ''
  for (let i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16)
  }
  return h
}

export function hexDecode(hex) {
  let s = ''
  for (let i = 0; i < hex.length; i += 2) {
    s += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return decodeURIComponent(decodeURI(s))
}
