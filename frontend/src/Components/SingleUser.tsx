import { IUser } from "../Types/types";
import { Link } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";

type SingleUserProps = {
  user: IUser;
};

export default function SingleUser({ user }: SingleUserProps) {
  return (
    <div
      className="bg-white border-[2px] border-blue-400  p-2 py-5 mt-3 rounded-3xl shadow-md  grid grid-cols-1
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    justify-center items-center content-center text-center transform transition-transform hover:scale-105"
    >
      <p className="m-2">{user.firstName + " " + user.lastName}</p>
      <p className="m-2">{user.email}</p>
      <p className="m-2">
        {user.role == "student" && <span className="badge">Student</span>}
        {user.role == "teacher" && <span className="badge">Teacher</span>}
        {user.role == "admin" && <span className="badge">Meneger</span>}
      </p>
      <p className="m-2">
        {user.isVerified ? (
          <span className="px-5 py-1 border-2 border-green-600 text-white bg-green-500 font-semibold rounded-full">
            Verified
          </span>
        ) : (
          <span className="px-5 py-1 border-2 border-red-600 text-white bg-red-500 font-semibold rounded-full">
            Not Verified
          </span>
        )}
      </p>
      <Link
        to={`/users/${user._id}`}
        className="flex items-center justify-center m-2"
      >
        <CiCircleMore
          size={40}
          className="transition-all hover:bg-gray-200 rounded-full p-1 hover:scale-95"
        />
      </Link>
    </div>
  );
}


