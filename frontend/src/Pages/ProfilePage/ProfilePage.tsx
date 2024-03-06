import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../Types/types";
import { useUsers } from "../../hooks/useUsers";
import UserInformation from "../../Components/UserInformation";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getOneUser } = useUsers();

  useEffect(() => {
    getOneUser(setUser, setError, id!);
  }, []);
  if (user == null && error == null) {
    return (
      <div>
        <p className="text-center text-2xl font-semibold uppercase mt-10">Loading...</p>
      </div>
    );
  }
  if (error != null) {
    return (
      <div className="text-center text-2xl font-semibold uppercase mt-10">
        <p>{error} 😔</p>
      </div>
    );
  }
  return  <div>
    <UserInformation user={user!} setUser={setUser} />
  </div>
}
