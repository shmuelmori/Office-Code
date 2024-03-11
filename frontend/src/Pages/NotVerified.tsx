import  { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export default function NotVerified() {
  const { getEmailAdmin } = useUsers();
  const [email, setEmail] = useState<string | null>("");
  useEffect(() => {
    getEmailAdmin(setEmail);
  }, []);
  const handleClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="h-screen bg-gradient-to-b from-red-400 to-white flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="w-[60vh] border-2 border-white rounded-md p-10">
          <div className="text-5xl">Sorry,</div>
          <div className="m-5 text-3xl">You are not verified...</div>
        </div>
        <div
          className="flex cursor-pointer mt-4 w-[30vh] border-2 p-2 rounded-md border-white hover:text-white transform transition-transform hover:scale-105"
          onClick={handleClick}
        >
          <div className="mx-auto">
            Please click here to contact the manager
          </div>
        </div>
      </div>
    </div>
  );
}
