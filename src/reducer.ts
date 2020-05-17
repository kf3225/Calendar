import { Reducer } from "react"

export interface State {
  today: Date,
}

export const initialState: State = {
  today: new Date(),
}
