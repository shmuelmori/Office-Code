import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getQuestion } from "../../Types/types";
import { useQuestions } from "../../hooks/useQuestion";
import OneQuestion from "./OneQuestion";




export default function HomeWork() {
  type levelType = "single number" | "array of numbers" | "matrix of numbers";

  const address =  window.location.pathname;
  const { user } = useContext(AuthContext);
  const { getQuestionByTeacherId } = useQuestions();
  const [questions, setQuestion] = useState<getQuestion[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [level, setLevel] = useState<levelType | null>(null);
  let sandTo: string = '';

  function scrollUp() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    getQuestionByTeacherId(user.user?.classId, setQuestion);
  }, []);

  if (questions?.length === 0) {
    return <div>you dont have question yet...</div>;
  }

  if(address === '/HomeWork'){
    sandTo = 'answerQuestion'
  }
  else if(address === '/GradeHistory'){
    sandTo = 'QuestionHistory'
    
  }
  return (
    <div>
      <button
        className="fixed top-4 left-1/2 bg-white  transform -translate-x-1/2 w-[20vh] p-2 rounded-md sm:w-[50vh] border-2"
        onClick={() => {
          scrollUp();
        }}
      >
        scroll up
      </button>
      <div>
        <input
          type="text"
          placeholder="day.munth.year"
          value={search}
          className="outline-none border-b-2 p-2"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="flex space-x-2">
        <div
          onClick={() => {
            if (level == "single number") setLevel(null);
            else setLevel("single number");
          }}
          className={`border-2 p-2 rounded-md m-2 cursor-pointer ${
            level == "single number" ? "bg-black text-white" : null
          }`}
        >
          Single number
        </div>
        <div
          onClick={() => {
            if (level == "array of numbers") setLevel(null);
            else setLevel("array of numbers");
          }}
          className={`border-2 p-2 rounded-md m-2 cursor-pointer ${
            level == "array of numbers" ? "bg-black text-white" : null
          }`}
        >
          Array of number
        </div>
        <div
          onClick={() => {
            if (level == "matrix of numbers") setLevel(null);
            else setLevel("matrix of numbers");
          }}
          className={`border-2 p-2 rounded-md m-2 cursor-pointer ${
            level == "matrix of numbers" ? "bg-black text-white" : null
          }`}
        >
          Matrix number
        </div>
      </div>

      <div className="border-b-2 border-green-200 text-center m-2 p-2 text-xl font-serif">{level}</div>

      {questions?.map((question) => {
        const date = new Date(question.createdAt).toLocaleDateString();

        if (
          (level == null && date.includes(search.toLowerCase())) ||
          level == question.level
        )
          return (
            <div key={question._id}>
              <OneQuestion Question={question.question}
              sandTo={sandTo}
              level={question.level} 
              idQuestion={question._id}/>
            </div>
          );
      })}
    </div>
  );
}
