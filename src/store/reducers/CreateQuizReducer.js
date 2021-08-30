import {CREATE_QUESTION} from "../actions/actionTypes";

const initialState = {
  quiz: []
}

export default function createQuizReducer(state=initialState, action){
  switch (action.type){
    case CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    default:
      return {
        ...state
      }
  }
}