import { MapPoint } from '@digital-first/df-map'
import { Commitment } from '../reducers/commitment/commitment.model'

export interface CommitmentMapPoint {
  mapPoint: MapPoint
  commitment: Commitment
}

export interface CommitmentMapPointsResult {
  commitmentMapPoints: CommitmentMapPoint[]
}
