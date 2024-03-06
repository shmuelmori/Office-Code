import { PiUserSwitch } from "react-icons/pi";
import { IUser } from "../Types/types";
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";
import Modal from "./Modal";

type Props = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export default function UserInformation({ user, setUser }: Props) {
  const { changeUserVerify } = useUsers();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="border-2 border-black rounded-3xl bg-white-300 p-5 flex flex-col sm:flex-row items-center justify-between">
      <div>
        <div className="font-serif text-xl">
          Name:{" "}
          <span className="font-normal text-sm">
            {user.firstName + " " + user.lastName}
          </span>{" "}
        </div>
        <p className="font-serif text-xl mt-2">
          Email: <span className="font-normal text-sm">{user.email}</span>
        </p>
        <div className="font-serif text-xl mt-2 flex gap-2 items-center">
          Verified :{" "}
          <span
            className={` px-5 py-0 flex w-fit justify-center items-center  cursor-pointer rounded-full text-white bg-red-400 ${
              user.isVerified == true && "!bg-green-500"
            }`}
          >
            <p
              className="cursor-pointer"
              onClick={() => {
                changeUserVerify(user._id, setUser);
              }}
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </p>
          </span>
          <PiUserSwitch
            className="cursor-pointer"
            onClick={() => {
              changeUserVerify(user._id, setUser);
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {user.classId ? "have class" : "not have a class"}
      </div>

      <div className="flex items-center justify-center gap-5 flex-col">
        <p className="text-sm ">
          You are a/an <span className="font-semibold">{user.role}</span>{" "}
        </p>
        <p className="font-semibold -mt-5">Change Role To:</p>
        {user.role == "student" ? (
          <p
            title="Teacher"
            className="text-2xl  cursor-pointer flex items-center justify-center flex-col transition-all bg-gray-200 p-3 rounded border-[1px] border-black hover:bg-white"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            {" "}
            <p>👨🏻‍🏫</p>
            <span className="text-sm font-semibold">Teacher</span>
          </p>
        ) : (
          <p
            title="Student"
            className="text-2xl  cursor-pointer flex items-center justify-center flex-col transition-all bg-gray-200 p-3 rounded border-[1px] border-black hover:bg-white"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            <p>🧑‍🎓</p>
            <span className="text-sm font-semibold">Student</span>
          </p>
        )}
      </div>
      {modalOpen ? (
        <Modal setModalOpen={setModalOpen} id={user._id} setUser={setUser} />
      ) : null}
    </div>
  );
}
