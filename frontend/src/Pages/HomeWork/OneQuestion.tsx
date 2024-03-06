import { Link } from "react-router-dom";

interface OneQuestionProps {
  Question: string;
  level: string;
  idQuestion: string;
  sandTo: string
}

export default function OneQuestion(props: OneQuestionProps) {
  const { Question, level, idQuestion, sandTo } = props;

  return (
    <Link to={`/${sandTo}/${idQuestion}`}>
      <div className="p-4 text-center border-2 m-2 rounded-md cursor-pointer">
        {" "}
        <div className="text-center p-2 font-bold text-green-600 text-xl">
          {level}
        </div>
        {Question}{" "}
      </div>
    </Link>
  );
}
