import { action } from 'typesafe-actions'
import { VideoActionTypes, Video, VideoSelectedPayload } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(VideoActionTypes.FETCH_REQUEST)
export const clearSelected = () => action(VideoActionTypes.CLEAR_SELECTED)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Video[]) => action(VideoActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(VideoActionTypes.FETCH_ERROR, message)
export const selectVideo = (videoId: string) => action(VideoActionTypes.SELECT_VIDEO, videoId)
export const videoSelected = (video: VideoSelectedPayload) => action(VideoActionTypes.SELECTED, video)
