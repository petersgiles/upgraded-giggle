export const findInLookup = (object, lookupSet) => {
    if (object && object.id && lookupSet) {
        return lookupSet[object.id]
    }
    return null
}