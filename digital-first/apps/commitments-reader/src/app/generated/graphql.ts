export type Maybe<T> = T | null

export interface MapPointInput {
  place_id: string

  address: string

  latitude: number

  longitude: number
}

export interface CommitmentMapPointInput {
  commitment?: Maybe<string>

  mapPoint?: Maybe<string>
}

export interface CommitmentInput {
  id?: Maybe<string>

  title: string

  description?: Maybe<string>

  cost?: Maybe<string>

  date?: Maybe<string>

  announcedby?: Maybe<string>
}

export interface TagInput {
  id?: Maybe<string>

  title: string

  description?: Maybe<string>

  sortorder?: Maybe<string>

  colour?: Maybe<string>

  icon?: Maybe<string>

  parent?: Maybe<string>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any
