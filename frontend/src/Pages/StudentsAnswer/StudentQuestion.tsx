import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useClass } from "../../hooks/useClass";
import { IUser, TeacherClass } from "../../Types/types";
import { Link } from "react-router-dom";

export default function StudentQuestion() {
  const [myClass, setMyClass] = useState<TeacherClass | null>(null);
  // const [solvedQuestion, setSolvedQuestion] = useState<number>(0);
  const { user } = useContext(AuthContext);
  const { getClassById } = useClass();
  useEffect(() => {
    getClassById(setMyClass, user.user?.classId || "");
  }, []);

  const getUngradedQuestionsCount = (student: IUser): number => {
    return student.tast.filter(
      (task) => task.questionId !== null && task.grade === 0
    ).length;
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {myClass?.students.map((stu) => {
        const ungradedQuestionsCount = getUngradedQuestionsCount(stu);

        return (
          <Link to={`/getOneUserById/${stu._id}`}
            className="m-2 border-2 bg-white shadow-md p-5 rounded cursor-pointer border-blue-300"
            key={stu._id}
          >
            <div className="font-semibold">
              Name:{" "}
              <span className="font-light">
                {stu.firstName + " " + stu.lastName}
              </span>
            </div>
            <div className="font-semibold">
              Email: <span className="font-light">{stu.email}</span>
            </div>
            {ungradedQuestionsCount != 0 ? (
              <div className="text-center p-2 font-extralight text-sm">
                answer to deal 🔔 {ungradedQuestionsCount}{" "}
              </div>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
