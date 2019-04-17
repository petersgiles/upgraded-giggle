import { idFromLookup } from '@df/sharepoint'
import { MapPoint } from '@digital-first/df-map'


export const mapCommitmentMapPoint = (commitmentMapPoint): any => ({
  id: commitmentMapPoint.ID,
  commitment: idFromLookup(commitmentMapPoint.Commitment),
  mapPoint: idFromLookup(commitmentMapPoint.MapPoint)
})
export const mapCommitmentMapPoints = (commitmentMapPoints): any[] => commitmentMapPoints.map(mapCommitmentMapPoint)


export const mapMapPoint = (location): any => ({
  id: location.ID,
  place_id: location.PlaceId,
  address: location.Title,
  latitude: location.Latitude,
  longitude: location.Longitude
})

export const mapMapPoints = (mapPoints): MapPoint[] =>
  mapPoints.map(mapMapPoint)