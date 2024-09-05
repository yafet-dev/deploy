import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, { name, email, age })
      .then((result) => {
        navigate("/");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white h-72 p-5 ">
        <form className="w-[32rem] p-2 flex flex-col gap-1" onSubmit={Update}>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full border p-1"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full border p-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="font-semibold">Age</label>
          <input
            type="number"
            placeholder="Enter your Age..."
            className="w-full border p-1"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <button className="text-white bg-green-700 font-semibold px-2 py-1 mt-5">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
