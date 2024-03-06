import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUsers } from "../hooks/useUsers";
import { IUser } from "../Types/types";
type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};
export default function Modal({ setModalOpen, id, setUser }: ModalProps) {
  const { changeUserRole } = useUsers();
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-5 rounded border-2 border-black max-w-[550px]">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <IoIosCloseCircleOutline size={25} className="text-red-600" />
          </button>
        </div>
        <p className="mt-3">
          Attention: By confirming this action, you acknowledge that the changes
          you are making will be permanent and cannot be reversed. Are you sure
          you want to proceed?
        </p>
        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            className="px-5 py-1 border-2 border-red-400 rounded hover:text-white hover:bg-red-400"
            onClick={() => {
              //sending the request to the server
              changeUserRole(id, setUser).then(() => {
                setModalOpen(false);
              });
            }}
          >
            Approve
          </button>
          <button
            className="px-5 py-1 border-2 border-green-400 rounded hover:text-white hover:bg-green-400"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

//onClick={()=>setModalOpen(prev=>!prev)}
