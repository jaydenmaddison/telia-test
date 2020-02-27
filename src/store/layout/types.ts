// Example for using discriminated union types.
export type ThemeColors = 'light' | 'dark'

// Use enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum LayoutActionTypes {
  SET_THEME = '@@layout/SET_THEME'
}

// Declare state types with `readonly` modifier to get compile time immutability.
export interface LayoutState {
  readonly theme: ThemeColors
}
