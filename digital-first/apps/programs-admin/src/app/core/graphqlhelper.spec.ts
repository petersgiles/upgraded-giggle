import { trimWhiteSpaceAndReplaceEmptyStringsWithNull } from './graphqlhelper'

describe('trimWhiteSpaceAndReplaceEmptyStringsWithNull', () => {
  it('should trim whitespace from string', () => {
    const objectToTrim = {
      name: '  string with whitespace   ',
      notes: 'abcd efg',
      total: 21
    }

    const result = trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim)

    expect(result.name).toBe(objectToTrim.name.trim())
  })

  it('should replace empty string with null', () => {
    const objectToTrim = {
      name: '    ',
      notes: 'blah blah',
      total: 21
    }

    const result = trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim)

    expect(result.name).toBe(null)
  })

  it('should be recursive', () => {
    const objectToTrim = {
      name: ' string with whitespace   ',
      notes: 'abc efg',
      total: 21,
      nestedObject: { name: ' string with whitespace', notes: '    ' }
    }

    const result = trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim)

    expect(result.name).toBe(objectToTrim.name.trim())
    expect(result.nestedObject.name).toBe(objectToTrim.nestedObject.name.trim())
    expect(result.nestedObject.notes).toBe(null)
  })

  it('should operate on arrays', () => {
    const arrayOfStrings: string[] = [' first ', ' second  ', ' third  ']

    const objectToTrim = {
      name: 'some name',
      notes: arrayOfStrings,
      total: 21
    }

    const result = trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim)

    result.notes.forEach((note, index) => {
      expect(note).toBe(arrayOfStrings[index].trim())
    })
  })
})
