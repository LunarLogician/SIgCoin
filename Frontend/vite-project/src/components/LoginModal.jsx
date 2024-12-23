import { useState } from "react";
import axios from "axios";
import Page from "./Page";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Modal({ closeModal }) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [text, setText] = useState("");
  
    const Handlesubmission = async (e) => {
      const nav = useNavigate();


      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          password,
        });
        setText(response.data.message);
        localStorage.setItem('token', response.data.token);
        nav('/Options');
        
      } catch (error) {
        console.error("Error during registration:", error);
        setText("Failed to register.");
      }
    };
  
    const handleUsername = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
  
    return (

      <div className="fixed inset-0 bg-slate-400 bg-opacity-30 backdrop-blur-sm items-center justify-center flex">
        <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
          <button
            onClick={closeModal}
            className="place-self-end ml-96 text-slate-900 text-5xl"
          >
            x
          </button>
          <form onSubmit={Handlesubmission}>
            <input
              onChange={handleUsername}
              type="text"
              placeholder="username"
              className="border p-2 mb-2 w-full text-black"

              value={username}
            />
            <input 
              onChange={handlePassword}
              type="password"
              placeholder="password"
              className="border p-2 mb-2 w-full text-black"
              value={password}
            />
            <input
              type="submit"
              className="bg-indigo-600 py-2 px-4 rounded-lg text-lg hover:bg-gray-800"
            />
            <h1 className="font-bold items-center">{text}</h1>
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  