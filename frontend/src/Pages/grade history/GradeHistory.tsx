import React, { useContext, useEffect, useState } from "react";
import { IUser, getQuestion } from "../../Types/types";
import { AuthContext } from "../../context/AuthContext";
import { useQuestions } from "../../hooks/useQuestion";
import { BarChart } from "@mui/x-charts/BarChart";
import HomeWork from "../HomeWork/HomeWork";

export default function GradeHistory() {
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState<getQuestion[] | null>(null);
  const { getQuestionByTeacherId } = useQuestions();

  useEffect(() => {
    getQuestionByTeacherId(user.user?.classId, setQuestion);
  }, []);

  const GradeTastResult = (user: IUser | null, type: string) => {
    if (user === null || question === null) return 0;
    let sum = 0;

    const sortQuestionClass = question!.filter((index) => index.level === type);

    const sortQuestionStudent = user.tast.filter((index) => {
      for (let i = 0; i < sortQuestionClass.length; i++) {
        if (index.questionId === sortQuestionClass[i]._id) {
          return index;
        }
      }
    });
  

    for (let i = 0; i < sortQuestionStudent.length; i++) {
      sum += sortQuestionStudent[i].grade;
    }

  if(sortQuestionStudent.length === 0) return 0;

    return sum / sortQuestionStudent.length;
  };

  return (
    <div>
      <div className="text-center text-4xl m-2">{user.user?.firstName + " " + user.user?.lastName}</div>
      <div>
        <div className="text-center"> Overall Average</div>
        <BarChart
          series={[
            {
              data: [
                GradeTastResult(user.user, "single number"),
                GradeTastResult(user.user, "array of numbers"),
                GradeTastResult(user.user, "matrix of numbers"),
              ],
            },
          ]}
          height={290}
          xAxis={[
            {
              data: ["Single number", "Array number", "Matrix number"],
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 30, right: 10 }}
        />
      </div>
      <div className="m-4">
        <HomeWork/>
      </div>
    </div>
  );
}
