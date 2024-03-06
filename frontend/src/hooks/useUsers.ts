import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../Types/setting";
import { ClassType, CreateClassType, IUser } from "../Types/types";
import {
  errorFromServer,
  successFromServer,
  verifyChangetoast,
} from "../../utils/toasts";
import { toast } from "react-toastify";
export function useUsers() {
  const {
    user: { token },
  } = useContext(AuthContext);
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function getAllUsers(
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
  ) {
    try {
      instance
        .get(BASE_URL + "/user/getAllUsers")
        .then((res) => setUsers(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneUser(
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    id: string
  ) {
    instance
      .get(BASE_URL + `/user/profileUser/${id}`)
      .then((res) => {
        if (res.status != 200) {
          setError(res.data.message);
          return;
        }
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }
  async function changeUserVerify(
    id: string,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  ) {
    instance
      .get(BASE_URL + `/user/change/${id}`)
      .then(() => {
        setUser((prev) => ({
          ...prev!,
          isVerified: !prev?.isVerified,
        }));
        verifyChangetoast();
      })
      .catch((error) => {
        if (!toast.isActive("message")) {
          if (axios.isAxiosError(error)) {
            errorFromServer(error.response?.data.message);
          }
        }
      });
  }
  async function changeUserRole(
    id: string,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  ) {
    instance
      .get(BASE_URL + `/user/changeRole/${id}`)
      .then(() => {
        setUser((prev) => ({
          ...prev!,
          role: prev!.role === "student" ? "teacher" : "student",
        }));
      })
      .catch((error) => {
        if (!toast.isActive("message")) {
          if (axios.isAxiosError(error)) {
            errorFromServer(error.response?.data.message);
          }
        }
      });
  }
  async function getTeachersOrUsers(
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
    search: string
  ) {
    instance.get(BASE_URL + `/user/${search}`).then((res) => {
      setUsers(res.data);
    });
  }

  async function CreateClass(
    data: ClassType,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    try {
      await axios
        .post(`${BASE_URL}/class/createClass`, data)
        .then((response) => {
          if (!toast.isActive("succesMessage")) {
            successFromServer(response.data.message);
          }
        })
        .catch((error) => {
          if (!toast.isActive("message")) {
            if (axios.isAxiosError(error)) {
              errorFromServer(error.response?.data.message);
            }
          }
        });
    } catch (error) {
      setError("Something went wrong");
    }
  }

  async function getClassById(
    id: string,
    setInformation: React.Dispatch<React.SetStateAction<CreateClassType | null>>
  ) {
    try {
      await axios
        .get(`${BASE_URL}/class/getClassById/${id}`)
        .then((res) => {
          setInformation(res.data);
        })
        .catch((r) => console.log(r));
    } catch (error) {
      console.log("we can show if he in class");
    }
  }

  async function getEmailAdmin(
    setEmail: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    try {
      await axios
        .get(`${BASE_URL}/user/getEmailAdmin/`)
        .then((res) => {
          setEmail(res.data);
        })
        .catch((r) => console.log(r));
    } catch (error) {
      console.log("we have a problem to show email");
    }
  }

  async function getOneUserById(
    id: string,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  ) {
    await axios
      .get(`${BASE_URL}/user/getOneUserById/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return {
    getAllUsers,
    getOneUser,
    getTeachersOrUsers,
    changeUserVerify,
    changeUserRole,
    CreateClass,
    getClassById,
    getEmailAdmin,
    getOneUserById,
  };
}
