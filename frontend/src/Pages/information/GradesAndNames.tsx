import { useContext, useEffect, useState } from "react";
import { IUser, TeacherClass, getQuestion } from "../../Types/types";
import { AuthContext } from "../../context/AuthContext";
import { useClass } from "../../hooks/useClass";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuestions } from "../../hooks/useQuestion";

export default function GradesAndNames() {
  const [myClass, setMyClass] = useState<TeacherClass | null>(null);
  const { user } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState<IUser | null>(null);
  const [question, setQuestion] = useState<getQuestion[] | null>(null);
  const { getClassById } = useClass();
  const { getQuestionByTeacherId } = useQuestions();
  useEffect(() => {
    getClassById(setMyClass, user.user?.classId || "");
    getQuestionByTeacherId(user.user?.classId, setQuestion);
  }, []);

  const GradeTastResult = (user: IUser, type: string) => {
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

    if (sortQuestionStudent.length === 0) return 0;

    return sum / sortQuestionStudent.length;
  };

  return (
    <div>
      <div className="text-center p-2 m-4 text-2xl font-serif">
        {myClass?.class.className}
      </div>
      <div className="w-full lg:w-[70vh]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ padding: "1.2rem" }} align="right">
                  Email
                </TableCell>
                <TableCell align="right">Task answer</TableCell>
                <TableCell align="right">Average</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myClass?.students.map((stud) => {
                let AverageGrade: number = 0;
                for (let i = 0; i < stud.tast.length; i++) {
                  AverageGrade += stud.tast[i].grade;
                }

                AverageGrade /= stud.tast.length;
                return (
                  <TableRow
                    key={stud._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      onClick={() => {
                        setShowDetails(stud);
                      }}
                      sx={{
                        cursor: "pointer",
                        padding: "1.2rem",
                        color: "blue",
                      }}
                      component="th"
                      scope="row"
                    >
                      {stud.firstName + " " + stud.lastName}
                    </TableCell>
                    <TableCell align="right">{stud.email}</TableCell>
                    <TableCell align="right">
                      {
                        stud.tast.filter((index) => index.solution !== null)
                          .length
                      }
                    </TableCell>
                    <TableCell align="right">{AverageGrade}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {showDetails ? (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="bg-white p-5 rounded border-2 border-black sm:w-[90vh]">
            <div className="flex items-center justify-end"></div>
            <div className="text-center m-2 text-xl">
              {showDetails.firstName + " " + showDetails.lastName}
            </div>
            <div>
              <BarChart
                series={[
                  {
                    data: [
                      GradeTastResult(showDetails, "single number"),
                      GradeTastResult(showDetails, "array of numbers"),
                      GradeTastResult(showDetails, "matrix of numbers"),
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
            <div className="mt-5 flex items-center justify-center gap-5">
              <button
                className="px-5 py-1 border-2 border-red-400 rounded hover:text-white hover:bg-red-400"
                onClick={() => {
                  setShowDetails(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
