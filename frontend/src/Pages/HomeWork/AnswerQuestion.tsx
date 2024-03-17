import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestion";
import { getQuestion } from "../../Types/types";
import { AuthContext } from "../../context/AuthContext";

export default function AnswerQuestion() {
  const { id } = useParams();
  const { getQuestionById, updateSolution } = useQuestions();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState<getQuestion | null>(null);
  const [answer, setAnswer] = useState<string>("function runCode(prop){\n \n}");
  useEffect(() => {
    getQuestionById(id!, setQuestion);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center w-[70%] p-2 border-green-400 border-2 rounded-sm">
        Please answer the questions and press the sand button only after you are
        sure of your answer.
        <br />
        <div className="text-red-500">
          do not chane the text in the input! the solution will not work!
        </div>
      </div>
      <div className="flex m-4 text-2xl">
        <span className="flex font-semibold mr-2">type:</span> {question?.level}
      </div>
      <div className="flex flex-col m-4 text-center justify-center items-center">
        <span className="flex font-semibold mr-2 text-2xl">Question description:</span>
        <br />
        <div>{question?.question}</div>
      </div>
      <div className="border-2 m-4 w-[70%] rounded-md">
        <textarea
          className="outline-none w-[100%] h-[100px] p-2"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          value={answer}
        ></textarea>
      </div>
      <div>
        <button
        onClick={()=> {
          updateSolution(user.user!._id, answer, question!._id)
        }}
         className="transition-colors duration-300 ease-in-out border-2 p-2 rounded-md w-[150px] cursor-pointer hover:text-white hover:bg-green-500">
          sand
        </button>
      </div>
    </div>
  );
}
