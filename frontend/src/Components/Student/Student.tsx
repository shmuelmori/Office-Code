import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Student() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white p-6 rounded-md">
      <motion.p
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="font-semibold m-2 w-fit px-5 py-2 rounded-md bg-yellow-200"
      >
        welcome
        <span>{" " + user.user?.firstName + " " + user.user?.lastName}</span>
      </motion.p>

      <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
            className="flex flex-col items-center md:flex-row md:justify-center"
          >
            <Link to={'/HomeWork'} className="flex flex-col justify-center items-center m-2 border-green-300 rounded-md border-2 w-[200px] min-h-[250px] cursor-pointer shadow-sm p-6 mb-6 bg-white ring-1 ring-gray-300 transform transition-transform hover:scale-105">
              <p className="text-center text-2xl mt-2">Home work</p>
              <p className="text-center">check what theacher sand</p>
              <img
                className="mt-2 max-w-[100px] max-h-[100px] rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRhyw7F0Eo54Wzgf33TGVhch8DS4fQI9z1Q&usqp=CAU"
                alt=""
              />
            </Link>{" "}
            <Link
              to={"/GradeHistory"}
              className="flex flex-col justify-center items-center m-2 border-blue-300 rounded-md border-2  w-[200px] min-h-[250px] cursor-pointer shadow-sm p-6 mb-6 bg-white ring-1 ring-gray-300 transform transition-transform hover:scale-105"
            >
              <p className="text-center text-2xl mt-2">Grade history</p>
              <p className="text-center">find your result</p>
              <img
                className="mt-2 max-w-[100px] max-h-[100px]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa05qBUw8k1EqK0oxD1Io6i7KV1QO4yVe1xQ&usqp=CAU"
                alt=""
              />
            </Link>{""}
            <Link to={'/'} className="flex flex-col justify-center items-center m-2 border-purple-300 rounded-md border-2 w-[200px] min-h-[250px] cursor-pointer shadow-sm p-6 mb-6 bg-white ring-1 ring-gray-300 transform transition-transform hover:scale-105">
              <p className="text-center text-2xl mt-2">for me</p>
              <p className="text-center">wait</p>
              <img
                className="mt-2 max-w-[100px] max-h-[100px] rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfdt_oiIJL9RvJt6QvhtbKJXGe4S4v4586A&usqp=CAU"
                alt=""
              />
            </Link>{" "}
          </motion.div>
    </div>
  );
}
