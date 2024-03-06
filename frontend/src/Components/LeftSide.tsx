import React from "react";
import { CreateClassType, IUser } from "../Types/types";
import { FaMinus } from "react-icons/fa6";

type Props = {
  teacher: IUser | null;
  students: IUser[];
  setMyClass: React.Dispatch<React.SetStateAction<CreateClassType>>;
  error: string | null;
};

export default function LeftSide({ setMyClass, error, students, teacher }: Props) {
  return (
    <div className="mt-3 p-2">
      <h1 className={`text-lg font-semibold mb-1 ${error == 'Teacher'? 'text-red-500' : null}`}>Teacher</h1>
      {teacher ? (
        <div className=" p-2 shadow-md mt-2 rounded-md flex items-center justify-between">
          <p className="font-thin">
            {teacher.firstName + " " + teacher.lastName}
          </p>
        </div>
      ) : null}
      <h1 className={`text-lg font-semibold mb-1 mt-3 ${error == 'Student'? 'text-red-500' : null}`}>Students</h1>
      {students.map((student) => {
        return (
          <div
            key={student._id}
            className=" p-2 shadow-md mt-2 rounded-md flex items-center justify-between"
          >
            <p className="font-thin">
              {student.firstName + " " + student.lastName} 
            </p>
            <button onClick={()=>{
              setMyClass((prev)=>({
                ...prev,
                students:prev.students.filter(user=>user._id!=student._id)
              }))
            }}>
            <FaMinus/>
            </button>
          </div>
        );
      })}
    </div>
  );
}
