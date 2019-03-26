import { MapPoint } from '@digital-first/df-map'


export interface CommitmentMapPoint {
  mapPoint: MapPoint
  commitment: string
}

export interface CommitmentMapPointsResult {
  commitmentMapPoints: CommitmentMapPoint[]
}
