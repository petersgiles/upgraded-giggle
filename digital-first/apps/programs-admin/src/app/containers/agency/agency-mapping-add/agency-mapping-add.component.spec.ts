import { domainRegex } from './agency-mapping-add.component'

describe('Domain pattern', () => {
  it('should be true for valid domains', () => {
    const regexUnderTest = new RegExp(domainRegex)

    expect(regexUnderTest.test('pmc.com')).toEqual(true)
    expect(regexUnderTest.test('pm-c.com')).toEqual(true)
    expect(regexUnderTest.test('pmc.com')).toEqual(true)
  })

  it('should be false for invalid domains', () => {
    const regexUnderTest = new RegExp(domainRegex)

    expect(regexUnderTest.test('pmc.123')).toEqual(false)
    expect(regexUnderTest.test('pmc..com')).toEqual(false)
    expect(regexUnderTest.test('pmc-.com')).toEqual(false)
    expect(regexUnderTest.test('pmc%%.com')).toEqual(false)
  })
})
