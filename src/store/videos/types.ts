// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /teams
// https://docs.opendota.com/#tag/teams%2Fpaths%2F~1teams%2Fget
export interface Video {
  id: number
  name: string
  description: string
  image: string
  video: string
}

export interface VideoSelectedPayload {
  detail: Video
}

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum VideoActionTypes {
  FETCH_REQUEST = '@@videos/FETCH_REQUEST',
  FETCH_SUCCESS = '@@videos/FETCH_SUCCESS',
  FETCH_ERROR = '@@videos/FETCH_ERROR',
  SELECT_VIDEO = '@@videos/SELECT_VIDEO',
  SELECTED = '@@videos/SELECTED',
  CLEAR_SELECTED = '@@videos/CLEAR_SELECTED'
}

// Declare state types with `readonly` modifier to get compile time immutability.
export interface VideosState {
  readonly loading: boolean
  readonly data: Video[]
  readonly selected?: VideoSelectedPayload
  readonly errors?: string
}
