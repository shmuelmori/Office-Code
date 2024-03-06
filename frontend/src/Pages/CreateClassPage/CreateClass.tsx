import { useEffect, useState } from "react";
import { CreateClassType, ClassType } from "../../Types/types";
import UsersList from "../../Components/UsersList";
import LeftSide from "../../Components/LeftSide";
import { useUsers } from "../../hooks/useUsers";
export default function CreateClass() {
  const { CreateClass } = useUsers();

  const [error, setError] = useState<string | null>(" ");
  const [myClass, setMyClass] = useState<CreateClassType>({
    className: "",
    students: [],
    teacher: null,
  });

  useEffect(()=>{},[myClass])
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">Create a new class</h1>
      <div className=" p-2 mt-5 rounded-sm grid grid-col-1 md:grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-1 rounded-sm">
          {/* left side */}
          <input
            type="text"
            min={1}
            max={50}
            value={myClass.className}
            onChange={(e) =>
              setMyClass((prev) => ({ ...prev, className: e.target.value }))
            }
            className={`w-full py-2 px-4 border-2 border-gray-400 rounded ${
              error == "className" ? "border-red-500" : null
            }`}
            placeholder="Class Name"
          />
          <LeftSide
            teacher={myClass.teacher}
            students={myClass.students}
            setMyClass={setMyClass}
            error={error}
          />
        </div>
        
        <div className="p-2 border-t-[1px] border-t-black rounded-sm md:col-span-2 col-span-3">
          {/* right side */}
          <UsersList status={true} setMyClass={setMyClass} />
          <div className="mt-7"></div>
          <UsersList status={false} setMyClass={setMyClass} />
        </div>
      </div>
      <div className="flex fixed bottom-2 left-1/2 transform -translate-x-1/2 p-2 m-auto rounded-md justify-center items-center border-2 border-blue-200">
          <button
            onClick={() => {
              if (myClass.className.length <= 0) {
                setError("className");
                return;
              } else if (myClass.students.length <= 0) {
                setError("Student");
                return;
              } else if (!myClass.teacher) {
                setError("Teacher");
                return;
              }

              const sandClass: ClassType = {
                className: myClass.className,
                teacherId: myClass.teacher._id,
                students: myClass.students.map((stud) => {
                  return stud._id;
                }),
              };
              CreateClass(sandClass, setError);
            }}
            className="border-2 border-blue-500 hover:bg-white hover:text-blue-500 rounded-full px-6 py-2 text-white bg-blue-500"
          >
            create class
          </button>
        </div>
    </div>
  );
}




















