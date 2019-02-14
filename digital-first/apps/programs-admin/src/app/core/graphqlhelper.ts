// web api endpoint is expecting null for strings that are not mandatory
export function trimStringOrReturnNull(stringToTrim: string): string | null {
  return stringToTrim && stringToTrim.trim().length > 0
    ? stringToTrim.trim()
    : null
}
