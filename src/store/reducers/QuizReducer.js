import {
  LOAD_QUIZZES,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE, FETCH_NEXT_QUESTION, FETCH_QUIZ_FINISH, FETCH_REFRESH_QUIZ
} from "../actions/actionTypes";

const initState = {
  isLoading: false,
  quizzes: [],
  error: '',

  results: {}, // {[questionId] : 'successes' or 'unsuccessful'}
  quizIsFinished: false,
  answerState: null, // {[answerId] : 'successes' or 'unsuccessful'}
  activeQuestion: 0,
  quiz: null
}

export default function quizReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state, isLoading: true
      }
    case LOAD_QUIZZES:
      return {
        ...state, quizzes: action.payload, isLoading: false
      }
    case FETCH_QUIZZES_ERROR:
      return {
        ...state, isLoading: false, error: action.error
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, isLoading: false, quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state, results: action.result, answerState: action.answerState
      }
    case FETCH_NEXT_QUESTION:
      return {
        ...state, answerState: null, activeQuestion: action.number
      }
    case FETCH_QUIZ_FINISH:
      return {
        ...state, quizIsFinished: true
      }
    case FETCH_REFRESH_QUIZ:
      return {
        ...state,
        results: {},
        activeQuestion: 0,
        quizIsFinished: false,
        answerState: null
      }
    default:
      return state
  }
}