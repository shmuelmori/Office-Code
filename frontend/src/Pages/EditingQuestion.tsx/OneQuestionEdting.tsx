import React, {  } from "react";
import { HiTrash } from "react-icons/hi2";
import { useQuestions } from "../../hooks/useQuestion";
import "react-toastify/dist/ReactToastify.css";

interface OneQuestionEdtingProps {
  level: string;
  question: string;
  data: string;
}

const OneQuestionEdting: React.FC<OneQuestionEdtingProps> = ({
  level,
  question,
  data,
}) => {
  const { DeleteQuestion } = useQuestions();
  

  return (
    <>
      <div className="font-serif justify-between items-center shadow-lg text-center w-full border-2 border-green-400 mb-2 p-3 rounded-3xl cursor-pointer">
        <div className="sm:flex">
          <div className="flex flex-col font-semibold text-2xl p-6">
            Level<div className="font-thin text-sm mt-2">{level}</div>
          </div>
          <div className="flex flex-col font-semibold text-2xl p-6">
            Question<div className="font-thin text-sm mt-2">{question}</div>
          </div>
          <div className="flex flex-col font-semibold text-2xl p-6">
            Date<div className="font-thin text-sm mt-2">{data}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-2xl p-6">
          <div
            onClick={() => {
             DeleteQuestion(question);
            }}
            className="transform transition-transform hover:scale-125 p-3 rounded-full border-2"
          >
            <HiTrash />
          </div>
        </div>
      </div>
    </>
  );
};

export default OneQuestionEdting;

// import React from "react";
// import { HiTrash } from "react-icons/hi2";
// import { useQuestions } from "../../hooks/useQuestion";
// import { deleteQuestion } from "../../../utils/toasts";

// interface OneQuestionEdtingProps {
//   level: string;
//   question: string;
//   data: string;
// }

// const OneQuestionEdting: React.FC<OneQuestionEdtingProps> = ({
//   level,
//   question,
//   data,
// }) => {
//   const { DeleteQuestion } = useQuestions();
//   return (
//     <>
//       <div className="font-serif justify-between items-center shadow-lg text-center w-full border-2 border-green-400 mb-2 p-3 rounded-3xl cursor-pointer">
//         <div className="sm:flex">
//           <div className="flex flex-col font-semibold text-2xl p-6">
//             Level<div className="font-thin text-sm mt-2">{level}</div>
//           </div>
//           <div className="flex flex-col font-semibold text-2xl p-6">
//             Question<div className="font-thin text-sm mt-2">{question}</div>
//           </div>
//           <div className="flex flex-col font-semibold text-2xl p-6">
//             Date<div className="font-thin text-sm mt-2">{data}</div>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center items-center text-2xl p-6">
//           <div
//             onClick={() => {
//               deleteQuestion()
//             }}
//             className="transform transition-transform hover:scale-125 p-3 rounded-full border-2"
//           >
//             <HiTrash />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OneQuestionEdting;
