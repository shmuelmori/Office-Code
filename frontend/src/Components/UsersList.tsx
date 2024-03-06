import { useEffect, useState } from "react";
import { CreateClassType, IUser } from "../Types/types";
import { useUsers } from "../hooks/useUsers";
import { TiPlusOutline } from "react-icons/ti";

type Props = {
  status: boolean;
  setMyClass: React.Dispatch<React.SetStateAction<CreateClassType>>;
};

export default function UsersList({ status, setMyClass }: Props) {
  const [users, setUsers] = useState<IUser[]>([]);
  const { getTeachersOrUsers } = useUsers();
  useEffect(() => {
    getTeachersOrUsers(setUsers, status ? "teachers" : "students");
  }, []);

  function addUser(user: IUser) {
    if (status) {
      setMyClass((prev) => ({
        ...prev,
        teacher: user,
      }));
    } else {
      //checking if the user is NOT included in the array and than adding him 
      setMyClass((prev) => ({
        ...prev,
        students: prev.students.includes(user)
          ? [...prev.students]
          : [...prev.students, user],
      }));
    }
  }
  return (
    <div className="mt-5">
      <p className="text-xl text-center font-semibold mb-4">
        {status ? "Teachers" : "Students"}
      </p>
      <div className="max-h-[450px] overflow-y-scroll">
        {users.map((user) => {
          if(user.classId.length <= 0)
          return (
            <div
              key={user._id}
              className="flex items-center rounded-md justify-between gap-3 border-2 border-blue-400 p-3 mt-3 mr-2"
            >
              <p>{user.firstName + " " + user.lastName}</p>
              <p>{user.email}</p>
              <p>
                {user.classId?.length > 0 ? "Have Class" : null}
              </p>
              <button
                onClick={() => {
                  addUser(user);
                }}
              >
                <TiPlusOutline
                  size={25}
                  className="cursor-pointer border-2 rounded-md transition-all hover:text-blue-300"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
