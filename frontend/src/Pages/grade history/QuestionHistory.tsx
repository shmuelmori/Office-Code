import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestions } from "../../hooks/useQuestion";
import { AuthContext } from "../../context/AuthContext";
import { getQuestion } from "../../Types/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function QuestionHistory() {
  const { id } = useParams();
  const { getQuestionById } = useQuestions();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState<getQuestion | null>(null);
  const [solutionTest, setSolutionTest] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  useEffect(() => {
    getQuestionById(id!, setQuestion);
    console.log(user.user);
  }, [id]);

  useEffect(() => {
    findQuestion();
  }, [question]);

  function findQuestion() {
    for (let i = 0; i < user.user!.tast.length; i++) {
      if (user.user!.tast[i].questionId === id) {
        setSolutionTest(user.user!.tast[i].solution);
        if(user.user!.tast[i].grade !== 0)setShowSolution(true);
        break;
      }
    }
  }

  function copySolutionTestToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("SolutionTest copied to clipboard");
        // Optionally, you can show a success message here
      })
      .catch((error) => {
        console.error("Unable to copy SolutionTest to clipboard: ", error);
      });
  }

  return (
    <div className="flex flex-col text-center ">
      <div className="border-2 p-2 border-blue-400 rounded-r-xl ">
        {question?.question}
      </div>
      <div>
        {
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {solutionTest!}
          </SyntaxHighlighter>
        }
        <button
          className="border-2 p-2 rounded-md"
          onClick={() => {
            copySolutionTestToClipboard(solutionTest!);
          }}
        >
          Copy code
        </button>
        {showSolution ? (
          <div className="flex flex-col text-center m-2">
            <div className=" border-2 p-2 border-blue-400 rounded-r-xl m-2">
              Teacher solution:
            </div>
            <div>
              {question ? (
                <div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={solarizedlight}
                  >
                    {question!.solution}
                  </SyntaxHighlighter>
                  <button
                    className="border-2 p-2 rounded-md"
                    onClick={() => {
                      copySolutionTestToClipboard(question!.solution);
                    }}
                  >
                    Copy code
                  </button>
                </div>
              ) : (
                "techer solution not find..."
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
