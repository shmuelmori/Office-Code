import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { QuestionFromUser } from "../Types/types";
import { useQuestions } from "../hooks/useQuestion";
export default function CreateQuestion() {
  const { addQuestion } = useQuestions();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState<QuestionFromUser | null>(null);
  const [error, setError] = useState<
    "level" | "description" | "solution" | null
  >(null);

  const handleLevelChange = (str: string) => {
    setQuestion((prev) => ({
      ...(prev as QuestionFromUser),
      level: str,
    }));
  };

  useEffect(() => {
    const tempClass: string = user.user!.classId;
    const tempTeacher: string = user.user!._id;
    setQuestion((prev) => ({
      ...(prev as QuestionFromUser),
      classId: tempClass,
    }));

    setQuestion((prev) => ({
      ...(prev as QuestionFromUser),
      teacher: tempTeacher,
    }));
  }, []);

  return (
    <>
      <div className="min-h-[100vh] flex flex-col items-center bg-gradient-to-b from-white to-gray-100">
        <div className="bg-white mr-20 ml-20 border-2 border-blue-400 rounded-md p-3 text-center">
          Creating a question will require the teacher to choose a level, which
          contains what input an output will be such as string or number,
          arrray, a description of the question, and a solution to run.
        </div>
        <div className="flex mt-3 flex-wrap items-center justify-center">
          <div className="bg-white w-[250px] h-[300px] border-2 rounded-md sm:mr-2 border-blue-400 ">
            <div
              className={`text-center mb-10 p-1 font-semibold text-lg ${
                error == "level" ? "text-red-500" : null
              }`}
            >
              {error == "level" ? "*" : null} Choose a level:
            </div>
            <div className="m-4">
              <input
                type="radio"
                name="level"
                id="option1"
                className="cursor-pointer ml-3 mr-1"
                onChange={() => handleLevelChange("single number")}
              />
              <label
                className="transition-colors duration-300 ease-in-out p-1 hover:bg-blue-400 hover:text-white hover:border-blue-500 border-2 rounded-full cursor-pointer"
                htmlFor="option1"
              >
                {" "}
                single number
              </label>
            </div>
            <div className="m-4 ">
              <input
                type="radio"
                name="level"
                id="option2"
                className="cursor-pointer ml-3 mr-1"
                onChange={() => handleLevelChange("array of numbers")}
              />
              <label
                className="transition-colors duration-300 ease-in-out p-1 hover:bg-blue-400 hover:text-white hover:border-blue-500 border-2 rounded-full cursor-pointer"
                htmlFor="option2"
              >
                {" "}
                array of numbers
              </label>
            </div>
            <div className="m-4 ">
              <input
                type="radio"
                name="level"
                id="option3"
                className="cursor-pointer ml-3 mr-1"
                onChange={() => handleLevelChange("matrix of numbers")}
              />
              <label
                className="transition-colors duration-300 ease-in-out p-1 hover:bg-blue-400 hover:text-white hover:border-blue-500 border-2 rounded-full cursor-pointer"
                htmlFor="option3"
              >
                {" "}
                matrix of numbers
              </label>
            </div>
          </div>
          <div className=" bg-white w-[250px] h-[300px] border-2 border-blue-400 rounded-md mt-3 sm:mt-0">
            <div>
              <div
                className={`text-center p-1 font-semibold text-lg ${
                  error == "description" ? "text-red-500" : null
                }`}
              >
                {error == "description" ? "*" : null} Desccription of question:
              </div>
              <div className="absolute box-border"></div>
              <textarea
                autoFocus
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...(prev as QuestionFromUser),
                    question: e.target.value,
                  }))
                }
                className="rounded-md outline-none w-full h-[250px] p-5 box-border text-gray-500"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bg-white w-full mt-5 border-2 p-3 rounded-md border-blue-400 text-center">
          <div className="relative">
            <div
              className={`text-center p-1 font-semibold text-lg ${
                error == "solution" ? "text-red-500" : null
              }`}
            >
              {error == "solution" ? "*" : null} Write a solution to run:
            </div>
            <div className="absolute box-border "></div>
            <textarea
              value={question?.solution || "function runCode(num){\n}"}
              onChange={(e) =>
                setQuestion((prev) => ({
                  ...(prev as QuestionFromUser),
                  solution: e.target.value,
                }))
              }
              className="border-2 rounded-md outline-none w-full h-full p-5 box-border mt-3 text-gray-500"
            ></textarea>
          </div>
        </div>
        <button
          onClick={async () => {
            if (question?.level == null) setError("level");
            else if (question.question == null) setError("description");
            else if (question.solution == null) setError("solution");
            else {
              await addQuestion(question!);
            }
          }}
          className="transition-colors duration-300 ease-in-out m-2 p-2 rounded-md bg-white border-blue-400 border-2 hover:bg-blue-400 hover:text-white hover:border-blue-600"
        >
          sand question
        </button>
      </div>
    </>
  );
}


