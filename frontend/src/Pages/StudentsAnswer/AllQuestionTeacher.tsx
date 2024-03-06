import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestion";
import { TeacherClass, getQuestion } from "../../Types/types";
import { AuthContext } from "../../context/AuthContext";
import { useClass } from "../../hooks/useClass";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function AllQuestionTeacher() {
  const { id } = useParams();
  const { getQuestionById, changeGrade } = useQuestions();
  const [question, setQuestion] = useState<getQuestion | null>(null);
  const [search, setSearch] = useState<string>("");
  const [myClass, setMyClass] = useState<TeacherClass | null>(null);
  const [date, setDate] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);

  const { user } = useContext(AuthContext);
  const { getClassById } = useClass();
  useEffect(() => {
    getClassById(setMyClass, user.user?.classId || "");
  });

  useEffect(() => {
    if (id && !question) getQuestionById(id, setQuestion);

    if (question) {
      setDate(new Date(question.createdAt).toLocaleDateString());
    }
  }, [id, question]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value); // Convert input value to number
    setGrade(value); // Update state with the converted number
  };

  return (
    <div>
      <div className="text-2xl text-center font-serif m-2">
        {question?.question}
      </div>
      <div className="text-xl text-center font-mono m-2">{date}</div>

      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="student name..."
          value={search}
          className="outline-none mt-4 w-[50vh] text-gray-400 text-center border-b-2 p-2"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="">
        {myClass?.students.map((index) => {
          if (
            index.lastName.includes(search.toLowerCase()) ||
            index.firstName.includes(search.toLowerCase())
          ) {
            return (
              <div
                key={index._id}
                className="grid grid-cols-1 m-2 p-2 border-2 justify-center items-center text-center"
              >
                <div className="text-xl font-extrabold">
                  {" "}
                  {index.firstName} {index.lastName}
                </div>
                <div className="m-2 p-2 w-full">
                  {index.tast
                    .filter((tas) => tas.questionId === id)
                    .map((tas) => {
                      return (
                        <div key={tas.questionId}>
                          <SyntaxHighlighter
                            language="javascript"
                            style={solarizedlight}
                          >
                            {tas.solution}
                          </SyntaxHighlighter>
                          <div>grade: {tas.grade}</div>
                          <div>
                            <div>Change grade</div>
                            <input
                              onChange={handleInputChange}
                              className="outline-none m-2 p-2 w-[20vh] text-gray-400 text-center border-b-2"
                              type="number"
                              value={grade}
                            />
                            <button
                              onClick={() =>
                                changeGrade(tas.questionId, index._id, grade)
                              }
                              className="p-2 border-2 rounded-md"
                            >
                              sand grade
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
