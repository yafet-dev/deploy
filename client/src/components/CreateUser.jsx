import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("https://deploy-api-gold.vercel.app/createUser", {
        name,
        email,
        age,
      })
      .then((result) => {
        navigate("/");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white h-72 p-5 ">
        <form className="w-[32rem] p-2 flex flex-col gap-1" onSubmit={Submit}>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full border p-1"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full border p-1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-semibold">Age</label>
          <input
            type="number"
            placeholder="Enter your Age..."
            className="w-full border p-1"
            onChange={(e) => setAge(e.target.value)}
          />
          <button className="text-white bg-green-700 font-semibold px-2 py-1 mt-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
