import React from "react";
import roboimg from "../assets/—Pngtree—future intelligent technology robot ai_5766888.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen  relative bg-gradient-to-b from-[#050d42] via-[#060130] to-[#000116] text-white  overflow-hidden">
      <div className="flex justify-between w-full h-screen items-center flex-wrap">
        <div className=" w-[400px] h-[300px] bg-purple-800 rounded-full blur-3xl opacity-50  "></div>
        <div className=" w-[400px] h-[300px] bg-purple-800 rounded-full blur-3xl opacity-50  "></div>
      </div>
      <div className="top-[10%]  absolute">
 <h1 onClick={()=>navigate("/chat")} navigate className="bg-[#050d42]/75 border backdrop-blur-md text-white text-center px-5 py-2 xl:w-[40%] w-[80%] m-auto mt-10 rounded-2xl shadow-xl font-semibold text-xl animate-fancy-entry hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
  Start Conversation
</h1>
      <div className="xl:flex justify-center px-8 items-center ">
     
      {/* left */}
      <div className="xl:w-[33%] ">
        <h1 className="xl:text-6xl xl:text-start text-center text-5xl font-bold font">CHAT BOT</h1>
        <h1 className="xl:text-6xl xl:text-start text-center text-5xl font-bold font">AI GENERETED</h1>
        <div>
          <h5 className="text-xl pt-5 xl:text-start text-center">
            Your personal AI assistant powered by Gemini. Ask anything, anytime
            — instantly
          </h5>
        </div>
      </div>
       <div className="xl:h-[80vh] xl:w-[33%]  xl:top-[50%] xl:left-[50%] ">
        <img className="w-full h-full" src={roboimg} alt="" />
      </div>
      {/* right */}
      <div className="xl:w-[33%]  ">
        <Link to={"chat"} className="text-xl xl:text-start text-center xl:pl-0 pl-2 font-thin font flex items-center IoIosArrowRoundForward-parent transition-all">
          Start Conversation
          <IoIosArrowRoundForward className="mt-1 text-5xl transition-all IoIosArrowRoundForward " />
        </Link>
        <div>
          <h5 className="xl:text-sm text-md xl:text-start text-center ">
            Talk to your AI assistant like never before. It listens,
            understands, and responds instantly. Powered by Gemini, built for
            real conversations. Smart, simple, and always ready to help.
          </h5>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
