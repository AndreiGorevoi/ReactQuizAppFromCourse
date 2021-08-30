import React from "react";
import classes from "./Answer.module.scss"
import AnswerItem from "./answerItem/AnswerItem";

const AnswerList = props => {
  return(
    <ul className={classes.QuestionsList}>
      {props.answers.map ((answer,index)=>{
        return (<AnswerItem
          key={index}
          answer={answer}
          clickAnswer={props.clickAnswer}
          answerState={props.answerState ? props.answerState[answer.id] : null}
        />)
      })}
    </ul>
    )
}

export default AnswerList