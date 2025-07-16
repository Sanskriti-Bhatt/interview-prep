// const { GoogleGenAI } = require("@google/genai"); 
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role , experience , topicsToFocus , numberOfQuestions } = req.body ; 
    if(!role || !experience || !topicsToFocus || !numberOfQuestions ){
        return res.status(400).json({message:"Missing required fields "})  ; 
    }
    // const prompt = questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions) ;;

    // const response = await ai.models.generateContent({
    //     model:"gemini-2.0-flash-lite" , 
    //     contents: prompt ,
    // }) ; 
    // let rawText = response.text ; 
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" }); // or gemini-pro, gemini-1.0, etc.

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    //Clean it: Remove '``` json and ``` from beginnning and end 
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "")        // remove ending ```
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explanation for a concept or interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body ; 
    if(!question){
        return res.status(400).json({message:"Missing required fields "}) ; 
    }
    // const prompt= conceptExplainPrompt(question) ; 

    // const response= await ai.models.generateContent({
    //     model:"gemini-pro",
    //     contents:prompt,
    // });

    // let rawText = response.text ; 

       const prompt = conceptExplainPrompt(question);

    const model = ai.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    //Clean it: Remove '``` json and ``` from beginnning and end 
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "")        // remove ending ```
      .trim();
     const data = JSON.parse(cleanedText);
    res.status(200).json(data);
   
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };