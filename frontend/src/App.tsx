import {
  Routes,
  BrowserRouter as Router,
  Navigate,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/HomePage/Home";
import { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import CreateClass from "./Pages/CreateClassPage/CreateClass";
import CreateQuestion from "./Components/CreateQuestion";
import GradesAndNames from "./Pages/information/GradesAndNames";
import NotVerified from "./Pages/NotVerified";
import EditingQuestion from "./Pages/EditingQuestion.tsx/EditingQuestion";
import DeleteClass from "./Pages/DeleteClass/DeleteClass";
import { Slide, ToastContainer } from "react-toastify";
import HomeWork from "./Pages/HomeWork/HomeWork";
import AnswerQuestion from "./Pages/HomeWork/AnswerQuestion";
import StudentsAnswer from "./Pages/StudentsAnswer/StudentsAnswer";
import StudentAnswerQuestion from "./Pages/StudentsAnswer/StudentAnswerQuestion";
import AllQuestionTeacher from "./Pages/StudentsAnswer/AllQuestionTeacher";
import GradeHistory from "./Pages/grade history/GradeHistory";
import QuestionHistory from "./Pages/grade history/QuestionHistory";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <ToastContainer transition={Slide} limit={1} />
      </div>
      <Toaster position="bottom-right" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user.user != null ? (
              user.user.isVerified ? (
                <Home />
              ) : (
                <NotVerified />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.user == null ? <LoginPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/register"
          element={
            user.user == null ? <RegisterPage /> : <Navigate to="/" replace />
          }
        />
        {/* only admin and also sending the user id */}
        <Route
          path="/users/:id"
          element={
            user.user && user.user.role == "admin" ? (
              <ProfilePage />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/create-class"
          element={
            user.user && user.user.role == "admin" ? (
              <CreateClass />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/DeleteClass"
          element={
            user.user && user.user.role == "admin" ? (
              <DeleteClass />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/create-question"
          element={
            user.user && user.user.role == "teacher" ? (
              <CreateQuestion />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/informationTeacher"
          element={
            user.user && user.user.role == "teacher" ? (
              <GradesAndNames />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/editingQuestion"
          element={
            user.user && user.user.role == "teacher" ? (
              <EditingQuestion />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/HomeWork"
          element={
            user.user && user.user.role == "student" ? (
              <HomeWork/>
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/answerQuestion/:id"
          element={
            user.user && user.user.role == "student" ? (
              <AnswerQuestion />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/StudentsAnswer"
          element={
            user.user && user.user.role == "teacher" ? (
              <StudentsAnswer />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/getOneUserById/:id"
          element={
            user.user && user.user.role == "teacher" ? (
              <StudentAnswerQuestion />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/AllQuestionTeacher/:id"
          element={
            user.user && user.user.role == "teacher" ? (
              <AllQuestionTeacher />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/GradeHistory"
          element={
            user.user && user.user.role == "student" ? (
              <GradeHistory />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/QuestionHistory/:id"
          element={
            user.user && user.user.role == "student" ? (
              <QuestionHistory />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
