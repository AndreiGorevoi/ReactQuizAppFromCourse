import {combineReducers} from "redux";
import quizReducer from "./QuizReducer";
import createQuizReducer from "./CreateQuizReducer";
import authReduced from "./AuthReducer";

export default combineReducers({
  quiz: quizReducer,
  createQuiz : createQuizReducer,
  auth : authReduced
})