import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ChatbotContainer() {
 const [allReply, setAllReply] = useState(() =>
  JSON.parse(localStorage.getItem("chatData")) || []
);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [runLoader, setRunLoader] = useState(false);
  const [hemburgerFlag, setHemburgerFlag] = useState(false);
const navigate = useNavigate()
  // Save to localStorage whenever chat updates
  useEffect(() => {
    localStorage.setItem("chatData", JSON.stringify(allReply));
  }, [allReply]);

  const fetchChatResponse = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) {
      setError("pagle h kiya");
      setUserInput("");
      return;
    }


    try {
      setError("");
      setRunLoader(true);

      const response = await axios.post("https://ai-power-chatboat-backend.onrender.com/chat", {
        message: trimmedInput,
      });

      const aiReply = response.data?.candidates?.[0]?.content?.parts[0]?.text;

      const newMessage = {
        id: nanoid(),
        userMsg: userInput,
        aiReply,
      };

      setAllReply((prev) => [...prev, newMessage]);
      setUserInput("");
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || err.message;
      console.error("❌ Error:", errorMsg);
      setError(errorMsg);
    } finally {
      setRunLoader(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchChatResponse();
  };
const DeleteHandler = (id)=>{
  const remendReply = allReply.filter(chat=>chat.id !=id)
  setAllReply(remendReply)
  
}
const AlldeleteHandler = ()=>{
  localStorage.removeItem("chatData");
  setAllReply([])
}
  return (
    <div className="xl:w-screen h-screen flex text-white">
      {/* Sidebar */}
      <div className={`xl:w-[20vw] xl:static hembuger-slider duration-300 ${hemburgerFlag ? "left-[0%]" : "-left-[50%]"} absolute h-full bg-[rgb(28,36,85)] px-5 flex flex-col items-start justify-between gap-3 py-3 overflow-auto chatbotsc-left`}>
        <div className=" flex flex-col  gap-3">
        {Array.isArray(allReply)?
          allReply.map((chat) => (
            <div
              key={chat.id}
              className="px-3 py-2 bg-[#0d1444] flex items-center justify-between rounded-md"
            >
              <span>{chat.aiReply.slice(0, 20)}...</span>
              <MdDelete onClick={()=>DeleteHandler(chat.id)} className="text-red-500" />
            </div>
          )):<h1 className="text-2xl font-bold">No Searches...</h1>}
          </div>
          <div className="flex flex-row gap-3">
          <button onClick={AlldeleteHandler} className="text-white bg-red-600 py-1 hover:bg-red-500 duration-150 rounded-md px-2 text-sm">Delete all</button>
          <button onClick={()=>navigate(-1)} className="text-white bg-yellow-600 py-1 hover:bg-yellow-500 duration-150 rounded-md px-2 text-sm">Go Back</button>
          </div>
      </div>

      {/* Main Chat Area */}
      <div className="xl:w-[80vw] w-screen h-full px-[10%] py-2 bg-[#0d1444]">
        <button onClick={()=>setHemburgerFlag(!hemburgerFlag)} className="xl:hidden  flex flex-col justify-between w-6 h-5 absolute right-7 p-1 group">
  <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:translate-x-1"></span>
  <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:translate-x-2"></span>
  <span className="block h-0.5 w-full bg-white transition-transform duration-300 group-hover:translate-x-3"></span>
</button>
        <div className="w-full h-[85%] chatbotsc-left py-5 flex flex-col  gap-3 overflow-y-auto">
          {allReply.map((chat) => (
            <div key={chat.id} className="flex flex-col gap-1">
              {chat.userMsg && (
                <div className="flex justify-end">
                  <div className="p-3 bg-blue-600 text-white rounded-xl max-w-[70%]">
                    <h1>{chat.userMsg}</h1>
                  </div>
                </div>
              )}
              {chat.aiReply && (
                <div className="flex justify-start">
                  <div className="p-3 bg-gray-800 text-white rounded-xl max-w-[70%]">
                    <h1>{chat.aiReply}</h1>
                  </div>
                </div>
              )}
            </div>
          ))}
          <h1 className="text-red-500">{error}</h1>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[rgb(28,36,85)] rounded-2xl w-full h-[15%] py-5 px-10 flex justify-center items-center gap-5"
        >
          <input
            required
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="px-3 py-2 outline focus:outline-purple-600 text-xl rounded-full w-full"
            placeholder="text..."
            type="text"
          />
          {runLoader ? (
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <button
              type="submit"
              className="py-2 px-3 bg-white text-black rounded-xl"
            >
              Run
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatbotContainer;
