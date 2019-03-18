import { idFromLookup } from '@df/sharepoint'

export const mapCommitmentTheme = (item): any => ({
    id: item.ID,
    commitment: idFromLookup(item.Commitment),
    theme: idFromLookup(item.Theme),
    Primary: item.Primary
})
export const mapCommitmentThemes = (items): any[] => items.map(mapCommitmentTheme)
