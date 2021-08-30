import React from "react";
import classes from './ActiveQuize.module.scss'
import AnswerList from "./questionsList/AnswerList";

const ActiveQuize = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.quizActiveQuestion}</strong>&nbsp;
        {props.question}
      </span>
      <small> {props.quizActiveQuestion} of {props.quizLength}</small>
    </p>
    <AnswerList
      answers={props.answers}
      clickAnswer={props.clickAnswer}
      answerState={props.answerState}
    />
  </div>
)

export default ActiveQuize