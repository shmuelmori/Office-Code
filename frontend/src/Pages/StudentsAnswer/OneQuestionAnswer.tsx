import { ChangeEvent, useEffect, useState } from "react";
import { IUser, getQuestion } from "../../Types/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useQuestions } from "../../hooks/useQuestion";

type prop = {
  index: getQuestion;
  user: IUser | null;
  date: string;
};

export default function OneQuestionAnswer({ index, user, date }: prop) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [grade, setGrade] = useState<number>(0);
  const [ChangeGrade, setChangeGrade] = useState<number>();
  const { checkCode, changeGrade } = useQuestions();

  useEffect(() => {
    getValueGrade();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value); // Convert input value to number
    setChangeGrade(value); // Update state with the converted number
  };

  function getValueGrade() {
    if (user !== null) {
      for (let i = 0; i < user.tast.length; i++) {
        if (user.tast[i].questionId === index._id) {
          setGrade(user.tast[i].grade );
        }
      }
    }
  }

  return (
    <div className="p-4">
      <div className="font-extrabold">Created in: {date}</div>
      <div className="font-serif text-center p-2"> {index.question}</div>
      <div>
        {user?.tast
          .filter((ques) => ques.questionId === index._id)
          .map((ques) => {
            return (
              <div key={ques.questionId}>
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
                  {ques.solution}
                </SyntaxHighlighter>
              </div>
            );
          })}
      </div>
      <div className="flex flex-row ">
        <div
          className={`m-2 w-full cursor-pointer rounded-sm border-2 border-blue-400 p-2 sm:w-[400px]  transition-colors duration-300 ease-in-out ${
            answer !== null
              ? "border-gray-300 bg-gray-300 cursor-default"
              : "hover:bg-blue-400 hover:text-white"
          }`}
          onClick={async () => {
            if (user && answer === null) {
              const solution = user.tast
                .filter((ques) => ques.questionId === index._id)
                .map((ques) => ques.solution)
                .join("\n"); // Concatenate multiple solutions with newline separator
              await checkCode(solution, index._id, setAnswer);
            }
          }}
        >
          run code
        </div>
        <div className="m-2 font-semibold">
          {answer === true ? (
            <span className="m-2">the function works! ✅</span>
          ) : answer === false ? (
            <span className="flex m-2">the functin faild... ❎</span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row w-full ">
        {grade === 0 ? (
          <div className="flex justify-center border-2 rounded-md p-4 bg-blue-200 w-[50vh] m-2 font-semibold">
            Grade:
            <input
              id={"inputGrade"}
              className="flex mb-4 ml-2 outline-none sm:w-[30vh] bg-blue-200 border-b-2 border-blue-500"
              type="number"
              max={100}
              min={0}
              value={ChangeGrade}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="flex justify-center rounded-md p-4 bg-green-200 w-[50vh] m-2 font-semibold">
            Grade: {grade}
          </div>
        )}
        <button
          onClick={() => {
            if (grade == 0) setGrade(ChangeGrade!);
            else setGrade(0);
          }}
          className="flex border-2 justify-center rounded-md p-4 border-red-400 w-[30vh] m-2 font-semibold"
        >
          Change grade
        </button>
      </div>
      {grade === 0 ? (
        <button
          onClick={() => {
            changeGrade(index._id, user!._id, ChangeGrade!);
          }}
          className="flex m-2 justify-center w-[30vh] border-2 border-black p-2"
        >
          sand grade
        </button>
      ) : null}
    </div>
  );
}
