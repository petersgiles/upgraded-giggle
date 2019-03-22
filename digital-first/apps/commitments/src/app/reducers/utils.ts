export const findInLookup = (object, lookupSet) => {
    if (object && object.id && lookupSet) {
        return lookupSet[object.id]
    }
    return null
}

export const findInLookupCommitmentPortfolio = (object, lookupSet) => {
    if (object && object.title && lookupSet) {
        let commitmentPortfolios = new Array()
        lookupSet.filter(obj => {
           if(obj.commitment === object.title){
            commitmentPortfolios.push(obj.portfolio)
           }
        })
        return commitmentPortfolios
    }
    return null
}