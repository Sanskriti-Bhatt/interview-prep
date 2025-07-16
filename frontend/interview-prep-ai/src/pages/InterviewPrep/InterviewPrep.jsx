import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import RoleInfoHeader from './RoleInfoHeader';
import AIResponsePreview from './AIResponsePreview';
import Drawer from '../../components/Drawer';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session); 
      }
    } catch (error) {
      console.log("Error:",error) ;
    }finally {
    setIsLoading(false); // Add this
  }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    //try {
    //   // Placeholder: Replace with your explanation logic
    //   const explanationData = `Explanation for: ${question}`;
    //   setExplanation(explanationData);
    // } catch (error) {
    //   toast.error("Failed to generate explanation.");
    // }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      console.log(response) ; 

      if(response.data && response.data.question) {
        //toast.success('question pinned successfully)
        fetchSessionDetailsById() ; 
      }
    }catch(error){
      console.log("Error:", error) ; 
    }
  };

  // Add more questions to a session
  const uploadMoreQuestions = async () => {
  //   try {
  //     // Placeholder: Logic to upload more questions
  //     toast.success("Questions uploaded successfully!");
  //   } catch (error) {
  //     toast.error("Failed to upload more questions.");
  //   }
   };

  // useEffect(() => {
  //   if (sessionId) {
  //     fetchSessionDetailsById();
  //   }
  // return ()=>{};
  // },[sessionId]);

  useEffect(() => {
  if (sessionId) {
    fetchSessionDetailsById();
  }
}, [sessionId]);

    return (
      <DashboardLayout> 
        <RoleInfoHeader
        role={sessionData?.role || ""}
         topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
               }
          /> 

          <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
            <h2 className="text-lg font-semibold color-black">Interview Q and A</h2>
            <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
               <div className={`col-span-12 ${
                openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
               }`} >
                <AnimatePresence>
                  {sessionData?.questions?.map((data,index) => {
                    return (
                      <motion.div
                        key={data._id || index}
                        initial={{opacity:0 ,y:-20}}
                        animate={{opacity:1 ,y:0}}
                        exit={{opacity:0 ,y:0.95}}
                        transition={{
                          duration:0.4,
                          type:"spring",
                          stiffness:100,
                          delay: index * 0.1 ,
                          damping:15,
                        }}
                        layout//This is the key prop that animates position changes 
                        layoutId={`question-${data._id || index }`} //Helps framer tracks specific items 
                        >
                          <>
                          <QuestionCard
                            question={data?.question}
                            answer={data?.answer}
                            onLearnMore ={() => 
                              generateConceptExplanation(data.question)
                            }
                            isPinned={data?.isPinned}
                            onTogglePin={() => toggleQuestionPinStatus(data._id)}
                            />
                            
                            </>
                        </motion.div>
                    );
                  })}
                </AnimatePresence>
               </div>
            </div>

            <div>
              <Drawer 
              isOpen={openLeanMoreDrawer}
              onClose={() => setOpenLeanMoreDrawer(false)}
              title={!isLoading && explanation?.title}
              >
                {errorMsg && (
                  <p className="flex gap-2 text-sm text-amber-600 font-medium">
                    <LuCircleAlert className="mt-1" />{errorMsg}
                  </p>
                )}
                {!isLoading && explanation && (
                  <AIResponsePreview content={explanation?.explanation} />

                )}
              </Drawer>
            </div>
          </div>       
      </DashboardLayout>
    )
};

export default InterviewPrep;                                                           