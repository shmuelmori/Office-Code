import React, { useState } from "react";
import StudentQuestion from "./StudentQuestion";
import Question from "./Question";

export default function StudentsAnswer() {
  const [showByStudent, setShowByStudent] = useState<boolean>(false);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      <div className="flex justify-center items-center m-2">
        <button
          onClick={() => setShowByStudent(true)}
          className="w-[50vh] border-2 p-2 m-2 bg-white shadow-sm text center rounded-md transition-colors duration-300 ease-in-out hover:bg-green-400 hover:text-white"
        >
          show by Student
        </button>
        <button
          onClick={() => setShowByStudent(false)}
          className="w-[50vh] border-2 p-2 m-2 bg-white shadow-sm text center rounded-md transition-colors duration-300 ease-in-out hover:bg-green-400 hover:text-white"
        >
          show by Question
        </button>
      </div>
      {showByStudent ? <StudentQuestion /> : <Question />}
    </div>
  );
}
