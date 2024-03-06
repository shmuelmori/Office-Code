import { useState } from "react";
import { RegisterForm } from "../../Types/types";
import { useAuth } from "../../hooks/useAuth";
import { FaEyeSlash } from "react-icons/fa";
export default function RegisterPage() {
  const [register, setRegister] = useState<RegisterForm>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, firstName, lastName, password } = register;
    if (email.length < 5) {
      setError("Invalid Email");
      return;
    }
    if (firstName.length < 2) {
      setError("Invalid First Name");
      return;
    }
    if (lastName.length < 2) {
      setError("Invalid Last Name");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at list 6 characters");
      return;
    }
    setError(null);
    signup(register, setError);
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8">Register</h1>
      <form className="w-full sm:w-[450px]" onSubmit={submitForm}>
        <input
          autoFocus
          value={register.firstName}
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, firstName: e.target.value }))
          }
          type="text"
          className="inputForm"
          placeholder="First Name"
        />
        <input
          value={register.lastName}
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, lastName: e.target.value }))
          }
          type="text"
          className="inputForm"
          placeholder="Last Name"
        />
        <input
          value={register.email}
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          className="inputForm"
          placeholder="Email"
        />
        <div className="disabled: flex justify-between p-2 text-gray-400 border-[3px] border-blue-500 rounded-md w-full mt-4 ">
        <input 
          value={register.password}
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, password: e.target.value }))
          }
          type={isPassword? "password" : "text"}
          placeholder="Password"
          className="outline-none w-full"
        />
        <p className="hover:text-black" onClick={()=>{
          setIsPassword(prev => !prev);
        }}><FaEyeSlash size={25}/></p>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mt-5 border-2 transition-all border-black bg-black text-white px-8 py-2 rounded-full  hover:bg-white hover:text-black"
          >
            Regrister Now!
          </button>
        </div>
      </form>
      {error ? (
        <h1 className="mt-5 text-red-500 font-semibold">{error}</h1>
      ) : null}
    </div>
  );
}


