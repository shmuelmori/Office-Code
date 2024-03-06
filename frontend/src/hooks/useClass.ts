import axios from "axios";
import { getClassType, IUser, TeacherClass } from "../Types/types";
import { BASE_URL } from "../Types/setting";
import {toast} from "react-toastify";
import { successFromServer } from "../../utils/toasts";

export function useClass() {
  function getClassById(
    setClass: React.Dispatch<React.SetStateAction<TeacherClass | null>>,
    classID: string
  ) {
    axios
      .get(`${BASE_URL}/class/getClassById/${classID}`)
      .then((response) => {
        setClass(response.data);
      })
      .catch((err) => {
        console.log("we have got an error ", err);
      });
  }

  function getAllClass(
    setAllClass: React.Dispatch<React.SetStateAction<getClassType[] | null>>
  ) {
    try {
      axios.get(`${BASE_URL}/class/getAllClass`).then((res) => {
        setAllClass(res.data);
      });
    } catch (error) {
      console.log("we have error");
    }
  }

  function DeleteClass(_id: string) {
    try {
      axios.post(`${BASE_URL}/class/DeleteClass/`, {_id})
    .then((response)=> {
      if(!toast.isActive('succesMessage')){
        successFromServer(response.data.message)
      }
      })
    } catch (error) {
      console.log("we have error");
    }
  }

  function getNameOfTeacher(
    _id: string,
    setTeacher: React.Dispatch<React.SetStateAction<IUser | null>>
  ) {
    try {
      axios
        .get(`${BASE_URL}/class/getNameOfTeacher/${_id}`)
        .then((res) => setTeacher(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  return { getClassById, getAllClass, DeleteClass, getNameOfTeacher };
}
