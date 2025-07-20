

import React, { useState, useEffect, useRef } from 'react';
import { LuChevronDown, LuCircleAlert, LuPinOff, LuSparkles, LuPin } from "react-icons/lu";
import AIResponsePreview from '../../pages/InterviewPrep/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10); // buffer space
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between gap-3">
        {/* Question Section */}
        <div 
          className="flex-1 cursor-pointer"
          onClick={toggleExpand}
        >
          <h3 className="text-xs md:text-[14px] font-medium text-gray-800 leading-[18px]">
            <span className="text-xs md:text-[15px] font-semibold text-gray-400 mr-2">
              Q.
            </span>
            {question}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className={`flex items-center gap-2 ${
              isExpanded ? "flex" : "hidden group-hover:flex"
            }`}
          >
            {/* Pin Button */}
            <button 
              onClick={onTogglePin} 
              className="flex items-center gap-1 text-xs text-indigo-800 font-medium bg-indigo-50 px-2 py-1 rounded whitespace-nowrap border border-indigo-50 hover:border-indigo-200 transition-colors"
            >
              {isPinned ? (
                <LuPinOff className="text-xs" />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>

            {/* Learn More Button */}
            <button
              className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-2 py-1 rounded whitespace-nowrap border border-cyan-50 hover:border-cyan-200 transition-colors"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles className="text-xs" />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>

          {/* Expand/Collapse Button */}
          <button 
            className="text-gray-400 hover:text-gray-500 transition-colors p-1"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}  
      >
        <div 
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 py-3 px-5 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;



//Before  :- error 



// import React, { useState, useEffect, useRef } from 'react';
// import { LuChevronDown, LuCircleAlert, LuPinOff, LuSparkles ,LuPin} from "react-icons/lu"; // Example icon
// import AIResponsePreview from '../../pages/InterviewPrep/AIResponsePreview';

// const QuestionCard = ({
//   question,
//   answer,
//   onLearnMore,
//   isPinned,
//   onTogglePin,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [height, setHeight] = useState(0);
//   const contentRef = useRef(null);

//   useEffect(() => {
//     if (isExpanded) {
//       const contentHeight = contentRef.current.scrollHeight ;
//       setHeight(contentHeight + 10); // buffer space
//     } else {
//       setHeight(0);
//     }
//   }, [isExpanded]);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return <>
//     <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
//       <div className="flex items-start gap-3.5">
//         <div className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
//             <span className="">
//                 Q
//             </span>

//             <h3
//             className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
//             onClick={toggleExpand}
//             >
//             {question}
//             </h3>
//             </div>
//             <div className="flex items-center justify-end ml-4 relative">
//                 <div
//                     className={`flex ${
//                         isExpanded ? "md:flex" : "md:hidden group-hover:flex"
//                     }`}>
//                     <button onClick={onTogglePin} className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer">
//             {isPinned ? (<LuPinOff className="text-xs"/>
//         ) : (
//             <LuPin className="text-xs" />
//         )}
//           </button>
//           <button
//           className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
//           onClick={()=>{
//             setIsExpanded(true);
//             onLearnMore();
//           }}>
//             <LuSparkles/>
//             <span className="hidden md:block">Learn More</span>
//           </button>
//             </div>
//             <button 
//                 className="text-gray-400 hover:text-gray-500 cursor-pointer"
//                 onClick={toggleExpand}
//             >
//                 <LuChevronDown
//                 size={20}
//                 className={`transform transition-transform duration-300 ${
//                     isExpanded ? "rotate-180" :""
//                 }`}
//                 />

//             </button>
//         </div>
//       </div>

//       <div
//         className="overflow-hidden transition-all duration-300 ease-in-out"
//         style={{ maxHeight: `${height}px`}}  
//       >
//         <div 
//             ref={contentRef}
//             className="mt-4 text-gray-700 bg-gray-50 py-3 px-5 rounded-lg"
//         >
//             <AIResponsePreview content={answer}/>
//         </div>
//       </div>
//     </div>
//     </>
     
// };

// export default QuestionCard;