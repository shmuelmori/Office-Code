import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useParams } from "react-router-dom";
import { IUser, getQuestion } from "../../Types/types";
import { useQuestions } from "../../hooks/useQuestion";
import OneQuestionAnswer from "./OneQuestionAnswer";

export default function StudentAnswerQuestion() {
  const [user, setUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState<string>("");
  const [questions, setQuestion] = useState<getQuestion[] | null>([]);
  const { getOneUserById } = useUsers();
  const { getQuestionByTeacherId } = useQuestions();
  const { id } = useParams();

  useEffect(() => {
    if (id != null && user === null) {
      getOneUserById(id, setUser);
    }
    if (user !== null && id !== null) {
      getQuestionByTeacherId(user?.classId, setQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  return (
    <div className="flex text-center flex-col justify-center items-center">
      <div className="text-4xl font-serif m-2">
        {user?.firstName + " " + user?.lastName}
      </div>
      <div>
        <input
          type="text"
          placeholder="day.month.year"
          value={search}
          className="outline-none mt-4 w-[50vh] text-gray-400 text-center border-b-2 p-2"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="mt-4 bg-gradient-to-b from-gray-100 to-white">
        {questions?.map((index) => {
          const date = new Date(index.createdAt).toLocaleDateString();
          if (date.includes(search.toLowerCase()))
            return (
              <div
                key={index._id}
                className="grid grid-cols-1 w-[full] bg-white border-2 p-4 m-4 rounded-md"
              >
                <OneQuestionAnswer index={index} user={user} date={date}/>
              </div>
            );
        })}
      </div>
    </div>
  );
}

// import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// export default function CreateQuestion() {
//   const { user } = useContext(AuthContext);
//     const code = `
//       const greeting = "Hello, World!";
//       console.log(greeting);
//     `;
//   return (
//     <div>
//        <SyntaxHighlighter language="javascript" style={solarizedlight}>
//       {code}
//     </SyntaxHighlighter>
//     </div>
//   )
// }
