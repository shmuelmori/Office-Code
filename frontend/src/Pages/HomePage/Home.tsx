import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Manager from "../../Components/Manager/Manager";
import Teacher from "../../Components/Teacher/Teacher";
import Student from "../../Components/Student/Student";
export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="HomePage">
      <div>
        {user.user?.role == "student" ? (
          <div>
            <Student/>
          </div>
        ) : user.user?.role == "teacher" ? (
          <div>
            <Teacher/>
          </div>
        ) : (
          <div>
            <Manager />
          </div>
        )}
      </div>
    </div>
  );
}
