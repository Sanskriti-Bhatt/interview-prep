import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const SignUp = ({setCurrentPage}) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle signup form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "" ;
    if(!fullName){
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter a password.");
      return; 
    }

    setError("");

    //SignUp API Call
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
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />

        {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-2"> */}
          <Input
            value={fullName}
            onChange={(target) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            />

            <Input
            value={email} 
            onChange={(target) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="text"
            />
            <Input
            value={password}
            onChange={(target) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            />
        {/* </div> */}

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button 
          className="font-medium text-primary underline cursor-pointer"
          onClick={() => {
            setCurrentPage("login");
          }}>
            Login
          </button>
        </p>
      </form>
       </div>
  )
};

export default SignUp
