import axios from "axios";
import { LoginForm, RegisterForm } from "../Types/types";
import { BASE_URL } from "../Types/setting";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginToast } from "../../utils/toasts";
export function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  async function signup(
    data: RegisterForm,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    //sending request an handling the response
    try {
      await axios
        .post(`${BASE_URL}/user/signup`, data)
        .then(() => {
          navigate("/login");
        })
        .catch((r) => setError(r.response.data.message));
    } catch (error) {
      setError("Something went wrong");
    }
  }
  async function login(
    data: LoginForm,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    try {
      await axios
        .post(`${BASE_URL}/user/login`, data)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          loginToast();
        })
        .catch((r) => setError(r.response.data.message));
    } catch (error) {
      setError("Something went wrong");
    }
  }


  return { signup, login };
}
