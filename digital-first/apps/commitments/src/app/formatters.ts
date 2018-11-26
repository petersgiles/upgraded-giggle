import { Commitment } from './reducers/commitment/commitment.model'

export function formatCommitmentTitle(commitment: Commitment) {

    const fullTitle = []

    if (commitment) {
        if (commitment.id) {
            const commitmentid = `${commitment.id}`
            fullTitle.push(`C–${commitmentid.padStart(4, '0')}`)
        }

        if (commitment.title) {
            fullTitle.push(`${commitment.title}`)
        }
    }

    return `${fullTitle.join(' ')}`
}