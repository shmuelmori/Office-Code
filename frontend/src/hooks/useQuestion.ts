import axios from "axios";
import { getQuestion, QuestionFromUser } from "../Types/types";
import { BASE_URL } from "../Types/setting";
import { toast } from "react-toastify";
import { errorFromServer, successFromServer } from "../../utils/toasts";
export function useQuestions() {
  async function addQuestion(question: QuestionFromUser) {
    try {
      axios
        .post(`${BASE_URL}/question/AddQuestion`, question)
        .then((Response) => {
          if (!toast.isActive("succesMessage")) {
            successFromServer(Response.data.message);
          }
        })
        .catch((error) => {
          if (!toast.isActive("errorMessage")) {
            if (axios.isAxiosError(error)) {
              errorFromServer(error.response?.data.message);
            }
          }
        });
    } catch (error) {
      if (!toast.isActive("errorMessage")) {
        if (axios.isAxiosError(error)) {
          errorFromServer(error.response?.data.message);
        }
      }
    }
  }

  async function getQuestionByTeacherId(
    _id: string | undefined,
    setQuestion: React.Dispatch<React.SetStateAction<getQuestion[] | null>>
  ) {    
    try {
      axios
        .post(`${BASE_URL}/question/getQuestionByTeacherId`, { _id })
        .then((response) => setQuestion(response.data));
    } catch (error) {
      if (!toast.isActive("errorMessage")) {
        if (axios.isAxiosError(error)) {
          errorFromServer(error.response?.data.message);
        }
      }
    }
  }

  async function DeleteQuestion(question: string) {
    try {
      console.log(question);

      axios
        .post(`${BASE_URL}/question/DeleteQuestion`, { question })
        .then((Response) => {
          console.log(Response);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function getQuestionById(
    id: string,
    setQuestion: React.Dispatch<React.SetStateAction<getQuestion | null>>
  ) {
    axios
      .get(`${BASE_URL}/question/getQuestionById/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateSolution(
    id: string | null,
    solution: string,
    questionId: string
  ) {
    try {
      axios
        .post(`${BASE_URL}/question/updateSolution`, {
          id,
          solution,
          questionId,
        })
        .then((Response) => {
          if (!toast.isActive("succesMessage")) {
            successFromServer(Response.data.message);
          }
        })
        .catch((error) => {
          if (!toast.isActive("errorMessage")) {
            if (axios.isAxiosError(error)) {
              errorFromServer(error.response?.data.message);
            }
          }
        });
    } catch (error) {
      if (!toast.isActive("errorMessage")) {
        if (axios.isAxiosError(error)) {
          errorFromServer(error.response?.data.message);
        }
      }
    }
  }

  async function checkCode(
    solution: string,
    id: string,
    setAnswer: React.Dispatch<React.SetStateAction<boolean | null>>
  ) {
    axios
      .post(`${BASE_URL}/question/checkCode`, { solution, id })
      .then((res) => {
        setAnswer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function changeGrade(
    questionId: string,
    userId: string,
    grade: number
  ) {
    axios
      .post(`${BASE_URL}/question/changeGrade`, { questionId, userId, grade })
      .then((Response) => {
        if (!toast.isActive("succesMessage")) {
          successFromServer(Response.data.message);
        }
      })
      .catch((error) => {
        if (!toast.isActive("errorMessage")) {
          if (axios.isAxiosError(error)) {
            errorFromServer(error.response?.data.message);
          }
        }
      });
  }
  return {
    addQuestion,
    getQuestionByTeacherId,
    DeleteQuestion,
    getQuestionById,
    updateSolution,
    checkCode,
    changeGrade,
  };
}
