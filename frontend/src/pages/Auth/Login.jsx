import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({setCurrentPage}) => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState(null);

  const navigate = useNavigate();
// Handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();

  // Validate email before sending request
  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if(!password) {
    setError("Please enter your password.");
    return;
  }

  setError("");

  try {
    // TODO: Your login API call here

  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again later.");
    }
  }
};

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your credentials to login.
      </p>

      <form onSubmit={handleLogin} >
        <Input 
         value={email}
         onChange={setEmail}
         label="Email Address"
         placeholder="Enter your email"
         type="text"
        />
        <Input 
         value={password}   
         onChange={setPassword}  
         label="Password"
         placeholder="Enter your password"
         type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button className="font-medium text-primary underline cursor-pointer"
          onClick={() =>{
            setCurrentPage("signup");
          }}>
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login
