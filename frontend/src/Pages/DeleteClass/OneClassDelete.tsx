import React, { useEffect, useState } from "react";
import { IUser, TeacherClass } from "../../Types/types";
import { useClass } from "../../hooks/useClass";
import { HiTrash } from "react-icons/hi2";

interface OneClassDeleteProps {
  classId: string;
}

const OneClassDelete: React.FC<OneClassDeleteProps> = ({ classId }) => {
  const [myClass, setMyClass] = useState<TeacherClass | null>(null);
  const [teacher, setTeacher] = useState<IUser | null>(null);
  const { getClassById, DeleteClass } = useClass();
  const { getNameOfTeacher } = useClass();
  useEffect(() => {
    getClassById(setMyClass, classId || "");
    getNameOfTeacher(classId, setTeacher);
  }, []);

  return (
    <div>
      <div className="flex text-xl font-serif">
        Class name:
        <p className="ml-3 font-mono text-gray-400">
          {myClass?.class.className}
        </p>
      </div>
      <div className="flex text-xl font-serif">
        Teacher name:
        <p className="ml-3 font-mono text-gray-400">
          {`${teacher?.lastName} ${teacher?.firstName}`}
        </p>
      </div>
      <div className="flex text-xl font-serif">
        Students number:
        <p className="ml-3 font-mono text-gray-400">
          {myClass?.students.length}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div
          onClick={() => {
            DeleteClass(classId);
          }}
          className="m-2 transform transition-transform hover:scale-125 p-3 rounded-full border-2"
        >
          {" "}
          <HiTrash />
        </div>
      </div>
    </div>
  );
};

export default OneClassDelete;
