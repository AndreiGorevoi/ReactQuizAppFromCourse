import axios from "../../axios/axios-creator";
import {
  FETCH_NEXT_QUESTION, FETCH_QUIZ_FINISH,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START, FETCH_REFRESH_QUIZ,
  LOAD_QUIZZES, QUIZ_SET_STATE
} from "./actionTypes";

export function getQuizzesFromServerAction() {
  return async dispatch => {
    dispatch(fetchQuizzesStart())
    const quizzes = []
    try {
      const response = await axios.get('/quizzes.json')
      Object.keys(response.data).forEach((item, index) => {
        quizzes.push({
          id: item,
          name: `Test №${index + 1}`
        })
      })
    } catch (e) {
      dispatch(fetchError(e))
    }
    dispatch(loadQuizzes(quizzes))
  }
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START
  }
}

export function loadQuizzes(quizzes) {
  return {
    type: LOAD_QUIZZES,
    payload: quizzes
  }
}

export function fetchError(e) {
  return {
    type: FETCH_QUIZZES_ERROR,
    error: e
  }
}

export function fetchQuizById(id) {
  return async dispatch => {
    dispatch(fetchQuizzesStart())

    try {
      const response = await axios.get(`/quizzes/${id}.json`)
      const quiz = response.data

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchError(e))
    }


  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function quizSetState(answerState, result) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    result
  }
}

export function fetchNextQuestion(number) {
  return {
    type: FETCH_NEXT_QUESTION,
    number
  }
}

export function fetchQuizFinish() {
  return {
    type: FETCH_QUIZ_FINISH
  }
}

function isQuizEnded(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function fetchClickAnswer(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    console.log(state)
    if (state.answerState) {
      if (state.answerState[answerId] === 'successes') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const result = state.results
    if (question.rightAnswerId === answerId) {
      if (!result[question.id]) {
        result[question.id] = 'Successes'
      }
      dispatch(quizSetState({[answerId]: 'successes'}, result))

      const timeOut = window.setTimeout(() => {
          if (!isQuizEnded(state)) {
            dispatch(fetchNextQuestion(state.activeQuestion + 1))

          } else {
            dispatch(fetchQuizFinish())
          }
          window.clearTimeout(timeOut)
        }
        , 1000)


    } else {
      result[question.id] = 'Error'
      dispatch(quizSetState({[answerId]: 'unsuccessful'}, result))
    }
  }
}

export function fetchRefreshQuiz() {
  return {
    type: FETCH_REFRESH_QUIZ
  }
}