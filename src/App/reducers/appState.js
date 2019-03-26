import { ApplicationStates } from "../constants";

const initialState = ApplicationStates.LOADING;


export default function appStateReducer(state = initialState, action) {
  return state;
}
