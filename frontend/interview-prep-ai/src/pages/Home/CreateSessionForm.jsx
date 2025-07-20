import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuRocket, LuUser, LuBriefcase, LuTarget, LuFileText } from 'react-icons/lu';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    description: "",
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill the required fields");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // Call AI API to generate questions 
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS, {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );
        
      // Should be array like: [{question,answer}, ...]
      const generatedQuestions = aiResponse.data;

      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        setError("Failed to generate questions. Please try again.");
        return;
      }

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.success && response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      } else {
        setError("Failed to create session. Please try again.");
      }
    } catch (error) {
      console.error("Create session error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");       
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl ">
    //   {/* Header */}
    //   <div className="text-center mb-8">
    //     <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
    //       <LuRocket className="text-3xl text-white" />
    //     </div>
    //     <h3 className="text-2xl font-bold text-gray-800 mb-2">
    //       Start Your Interview Journey
    //     </h3>
    //     <p className="text-gray-600">
    //       Fill out these details to get personalized interview questions tailored just for you!
    //     </p>
    //   </div>
    
     <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="space-y-6">
        {/* Role Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <LuUser className="text-blue-600" />
            Target Role *
          </label>
          <Input
            value={formData.role}
            onChange={(value) => handleChange("role", value)}
            placeholder="e.g., Frontend Developer, UI/UX Designer, Data Scientist"
            type="text"
            className="w-full"
          />
        </div>

        {/* Experience Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <LuBriefcase className="text-green-600" />
            Years of Experience *
          </label>
          <Input
            value={formData.experience}
            onChange={(value) => handleChange("experience", value)}
            placeholder="e.g., 2, 3, 5+ years"
            type="number"
            className="w-full"
          />
        </div>

        {/* Topics Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <LuTarget className="text-purple-600" />
            Key Topics to Focus On *
          </label>
          <Input
            value={formData.topicsToFocus}
            onChange={(value) => handleChange("topicsToFocus", value)}
            placeholder="e.g., React, Node.js, MongoDB, System Design"
            type="text"
            className="w-full"
          />
          <p className="text-xs text-gray-500">Separate multiple topics with commas</p>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <LuFileText className="text-orange-600" />
            Session Description (Optional)
          </label>
          <Input
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            placeholder="Any specific goals or notes for this interview session"
            type="text"
            className="w-full"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Create Session 
          {/* {isLoading ? (
            <>
              <SpinnerLoader />
              <span>Creating Your Session...</span>
            </>
          ) : (
            <>
              <LuRocket className="text-xl" />
              <span>Create Interview Session</span>
            </>
          )} */}
        </button>

        {/* Info Text */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <p className="text-sm text-blue-700">
            <strong>✨ What happens next?</strong> We'll generate 10 personalized interview questions 
            based on your role and experience level, complete with detailed answers to help you prepare.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;