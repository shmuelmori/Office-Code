import { IUser } from "../../Types/types";
import { useUsers } from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import SingleUser from "../SingleUser";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
export default function Manager() {
  const { getAllUsers } = useUsers();
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  if (users === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white p-6 rounded-md mt-3">
      <div className="justify-center items-center flex">
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
          <Link
            to={"/create-class"}
            className="flex bg-white flex-col w-[200px] m-3 h-[250px] border-2 border-blue-400 cursor-pointer rounded-md text-center text-2xl items-center justify-center font-serif transform transition-transform hover:scale-105 "
          >
            Create class
            <div className="text-base m-5">
              Choose a teacher and add students
            </div>
            <div className="text-blue-500">
              <TiPlusOutline />
            </div>
          </Link>
        </motion.div>
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
          <Link
            to={"/DeleteClass"}
            className="flex bg-white flex-col w-[200px] h-[250px] border-2 border-blue-400  cursor-pointer rounded-md text-center text-2xl items-center justify-center font-serif  transform transition-transform hover:scale-105"
          >
            Delete class
            <div className="text-base m-5">Block a class or delete a class</div>
            <div className="text-blue-500">
              <TiMinusOutline />
            </div>
          </Link>
        </motion.div>
      </div>
      <h1 className="text-xl font-semibold">Our Users:</h1>
      <div className="flex items-center gap-3">
        <p className="badge">
          Teachers: {users.filter((user) => user.role == "teacher").length}
        </p>
        <p className="badge">
          Students: {users.filter((user) => user.role == "student").length}
        </p>
      </div>
      <div className="flex flex-col md:flex-row  items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full h-full placeholder:font-semibold md:max-w-[450px] p-3 rounded my-5 border-2 border-black"
          placeholder="Search..."
        />
      </div>
      <div>
        {users.map((user, index) => {
          if (
            user.firstName
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            (user.firstName + " " + user.lastName)
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            user.lastName
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          ) {
            return (
              <motion.div
                key={user._id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 * index }}
              >
                <SingleUser user={user} key={user._id} />
              </motion.div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

{/* 
import { BarChart } from '@mui/x-charts/BarChart'
<BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C"],
                  },
                ]}
                series={[
                  { data: [4, 3, 7] },
                  { data: [1, 6, 3] },
                  { data: [2, 5, 6] },
                ]}
                width={500}
                height={300}
              /> */}