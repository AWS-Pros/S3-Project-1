"use client";
import { useEffect, useState } from "react";

export default function Main() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    StudentName: "",
    Class: "",
    Age: "",
  });

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await res.json();
      setStudents(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const newStudent = await res.json();

      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setForm({ StudentName: "", Class: "", Age: "" });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="h-[100vh] w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="h-[90vh] bg-white rounded w-1/2 flex justify-center items-center flex-col p-10 gap-y-6 shadow-lg"
        >
          <h1 className="text-4xl uppercase">🌼Student Table🌼</h1>
          <div className="w-full space-y-2">
            <label>Student Name</label>
            <input
              name="StudentName"
              value={form.StudentName}
              onChange={handleChange}
              className="w-full px-2 bg-gray-50 rounded border-[1px] py-3"
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="w-full space-y-2">
            <label>Class</label>
            <input
              name="Class"
              value={form.Class}
              onChange={handleChange}
              className="w-full px-2 bg-gray-50 rounded border-[1px] py-3"
              placeholder="Enter your class"
              required
            />
          </div>
          <div className="w-full space-y-2">
            <label>Age</label>
            <input
              name="Age"
              value={form.Age}
              onChange={handleChange}
              type="number"
              className="w-full px-2 bg-gray-50 rounded border-[1px] py-3"
              placeholder="Enter your age"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 rounded bg-blue-600 text-white"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="m-5 flex justify-center items-center flex-col">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">
            <thead className="text-xs text-white uppercase bg-gray-600 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Class
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
              </tr>
            </thead>

            <tbody>
              {students &&
                students.map((student, index) => {
                  const { StudentID, Class, StudentName, Age } = student;

                  return (
                    <tr
                      className="bg-gray-500 border-b border-gray-400"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                      >
                        {StudentID}
                      </th>
                      <td className="px-6 py-4">{StudentName}</td>
                      <td className="px-6 py-4">{Class}</td>
                      <td className="px-6 py-4">{Age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
