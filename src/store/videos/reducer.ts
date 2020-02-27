import { Reducer } from 'redux'
import { VideosState, VideoActionTypes } from './types'

// Type-safe initialState!
export const initialState: VideosState = {
  data: [],
  errors: undefined,
  selected: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<VideosState> = (state = initialState, action) => {
  switch (action.type) {
    case VideoActionTypes.FETCH_REQUEST:
    case VideoActionTypes.SELECT_VIDEO: {
      return { ...state, loading: true }
    }
    case VideoActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case VideoActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case VideoActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    case VideoActionTypes.CLEAR_SELECTED: {
      return { ...state, selected: undefined }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as videosReducer }
