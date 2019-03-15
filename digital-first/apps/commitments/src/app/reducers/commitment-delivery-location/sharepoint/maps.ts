import { idFromLookup } from '@df/sharepoint'
import { MapPoint } from '@digital-first/df-map'
import { Electorate } from '../../../models'

export const mapCommitmentMapPoint = (commitmentMapPoint): any => ({
  id: commitmentMapPoint.ID,
  commitment: idFromLookup(commitmentMapPoint.Commitment),
  mapPoint: idFromLookup(commitmentMapPoint.MapPoint)
})
export const mapCommitmentMapPoints = (commitmentMapPoints): any[] => commitmentMapPoints.map(mapCommitmentMapPoint)

export const mapElectorate = (electorate): Electorate => ({
  id: electorate.ID,
  title: electorate.Title,
  group: electorate.State
})

export const mapElectorates = (electorates): Electorate[] => electorates.map(mapElectorate)

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