import { Commitment } from './reducers/commitment/commitment.model'

export function formatCommitmentTitle(commitment: { id: string | number, title: string }) {

    const fullTitle = []

    if (commitment) {
        if (commitment.title) {
            fullTitle.push(`${commitment.title}`)
        }
    }

    return `${fullTitle.join(' ')}`
}

export function formatCommitmentId(commitment: { id: string | number, title: string }) {

    const fullTitle = []

    if (commitment) {

        if (commitment.id) {
            const commitmentid = `${commitment.id}`
            fullTitle.push(`C–${commitmentid.padStart(4, '0')}`)
        }
    }

    return `${fullTitle.join(' ')}`
}