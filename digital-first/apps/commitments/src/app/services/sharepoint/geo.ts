import { MapPoint } from '../../reducers/map-point/map-point.model'
import { Location } from '../../models/location.model'
import { idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentMapPoint = (commitmentMapPoint): any => ({
  id: commitmentMapPoint.ID,
  commitment: idFromLookup(commitmentMapPoint.Commitment),
  mapPoint: idFromLookup(commitmentMapPoint.MapPoint)
})
export const mapCommitmentMapPoints = (commitmentMapPoints): any[] => commitmentMapPoints.map(mapCommitmentMapPoint)

export const mapElectorate = (electorate): Location => ({
  id: electorate.ID,
  title: electorate.Title,
  group: electorate.State
})

export const mapElectorates = (electorates): Location[] => electorates.map(mapElectorate)

export const mapCommitmentElectorate = (commitmentElectorate): any => ({
  id: commitmentElectorate.ID,
  commitment: idFromLookup(commitmentElectorate.Commitment),
  electorate: idFromLookup(commitmentElectorate.Electorate)
})
export const mapCommitmentElectorates = (commitmentElectorates): any[] => commitmentElectorates.map(mapCommitmentElectorate)

export const mapMapPoint = (location): any => ({
  id: location.ID,
  place_id: location.PlaceId,
  address: location.Title,
  latitude: location.Latitude,
  longitude: location.Longitude
})

export const mapMapPoints = (mapPoints): MapPoint[] =>
  mapPoints.map(mapMapPoint)