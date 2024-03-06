import React, { useEffect, useState } from "react";
import { useClass } from "../../hooks/useClass";
import { getClassType } from "../../Types/types";
import OneClassDelete from "./OneClassDelete";

export default function DeleteClass() {
  const { getAllClass } = useClass();
  const [allClass, setAllClass] = useState<getClassType[] | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getAllClass(setAllClass);
  }, []);
  return (
    <div className="">
      <div className="text-center text-3xl m-3 ">Edeting class</div>
      <div className="w-[40vh] p-3 border-b-2 border-blue-200 text-gray-500">
        we have {allClass?.length} class
      </div>
      <div className="w-[40vh] p-3 justify-center items-center border-b-2 border-blue-200 text-gray-500">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="outline-none"
          placeholder="Search..."
        />
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-center">
        {allClass?.map((oneClass) => {
          if (
            oneClass.className
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )
            return (
              <div
                className="flex p-4 m-3 border-2 rounded-md border-purple-300 shadow-md"
                key={oneClass._id}
              >
                <OneClassDelete classId={oneClass._id} />
              </div>
            );
        })}
      </div>
    </div>
  );
}
