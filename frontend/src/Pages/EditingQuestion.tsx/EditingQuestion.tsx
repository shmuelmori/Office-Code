import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuestions } from "../../hooks/useQuestion";
import { getQuestion } from "../../Types/types";
import OneQuestionEdting from "./OneQuestionEdting";
export default function EditingQuestion() {
  const { user } = useContext(AuthContext);
  const { getQuestionByTeacherId } = useQuestions();

  const [questions, setQuestion] = useState<getQuestion[] | null>([]);

  useEffect(() => {
    getQuestionByTeacherId(user.user?.classId, setQuestion);
  }, []);

  return (
    <>
      <div className="text-xl justify-center items-center flex-col-1">
        {questions?.map((question) => (
          <OneQuestionEdting
            key={question.question}
            level={question.level}
            question={question.question}
            data={new Date(question.createdAt).toLocaleDateString()}
          />
        ))}
        {questions?.length == 0 ? 'you dont have question yet..' : null}
      </div>
    </>
  );
}
