import {CLEAR_QUIZ, CREATE_QUESTION} from "./actionTypes";
import axios from "../../axios/axios-creator";

export function createQuestion(item) {
  return {
    type: CREATE_QUESTION,
    item
  }
}

export function clearQuiz() {
  return {
    type: CLEAR_QUIZ
  }
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizzes.json', getState().createQuiz.quiz)
    dispatch(clearQuiz)
  }
}