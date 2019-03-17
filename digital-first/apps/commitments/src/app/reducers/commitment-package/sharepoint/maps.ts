import { idFromLookup } from '@df/sharepoint'

export const mapCommitmentPackage = (item): any => ({
    id: item.ID,
    commitment: idFromLookup(item.Commitment),
    package: idFromLookup(item.Package),
    Primary: item.Primary
})
export const mapCommitmentPackages = (items): any[] => items.map(mapCommitmentPackage)
