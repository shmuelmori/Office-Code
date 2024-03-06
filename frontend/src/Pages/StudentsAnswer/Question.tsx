import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuestions } from "../../hooks/useQuestion";
import { getQuestion } from "../../Types/types";
import { Link } from "react-router-dom";

export default function Question() {
  const { user } = useContext(AuthContext);
  const { getQuestionByTeacherId } = useQuestions();
  const [question, setQuestion] = useState<getQuestion[] | null>(null);
  useEffect(() => {
    getQuestionByTeacherId(user.user?.classId, setQuestion);
  }, []);

  return (
    <div className="flex justify-center">
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
     {question?.map((index) => {
        return <Link to={`/AllQuestionTeacher/${index._id}`} 
        key={index._id}
        className="w-[50vh] m-4 text-center cursor-pointer p-4 border-2 border-orange-300 bg-white rounded-md shadow-xl"
        >
          <div 
          className="p-2 font-light"
          >{index.question}</div>
          <div
          className=""
          >level: {" "} {index.level}</div>
        </Link>
      })}
     </div>
    </div>
  );
}


