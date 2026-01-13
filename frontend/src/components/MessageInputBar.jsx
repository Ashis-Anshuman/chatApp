// import { Paperclip, Send, Smile } from 'lucide-react'

// function MessageInputBar() {
//   return (
//     <div className="shrink-0 p-3 sm:p-4 border-t border-slate-800">
//         <div className="flex items-center gap-2 sm:gap-3">

//           {/* INPUT WRAPPER */}
//           <div className="relative flex-1">

//             <button
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 md:hidden"
//             >
//               <Paperclip size={16} />
//             </button>

//             <button
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 md:hidden"
//             >
//               <Smile size={16} />
//             </button>

//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="
//                 input w-full
//                 bg-slate-950/50 border-none ring-1 ring-slate-800
//                 text-white text-sm
//                 pl-10 pr-10
//                 md:pl-3 md:pr-3
//               "
//             />
//           </div>

//           {/* Desktop icons (outside input) */}
//           <button className="hidden md:flex btn btn-ghost btn-sm text-slate-400">
//             <Paperclip />
//           </button>

//           <button className="hidden md:flex btn btn-ghost btn-sm text-slate-400">
//             <Smile />
//           </button>

//           {/* Send */}
//           <button className="btn btn-primary btn-sm sm:btn-md bg-blue-600 hover:bg-blue-500 border-none">
//             <Send size={16} />
//           </button>
//         </div>
//       </div>
//   )
// }

// export default MessageInputBar

import { useRef, useState } from "react";
import { Camera, Send, Smile } from "lucide-react";
import { useChatStore } from "../store/chatStore";


function MessageInputBar() {
  const imageInputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [inputImg, setInputImg] = useState(null);
  const {isSoundEnabled, sendMessage, selectedUser} = useChatStore();

  const handelImage = (e)=> {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = () => {setInputImg(reader.result)}
    reader.readAsDataURL(file);
  }

  const handelSendMessage = (e)=>{
    e.preventDefault();
    sendMessage(selectedUser._id , {
      text: inputText.trim(),
      image: inputImg
    })
    setInputText("");
    setInputImg(null);
  }

  return (
    <div className="shrink-0 p-3 sm:p-4 border-t border-slate-800">
      <form onSubmit={handelSendMessage} className="flex items-center gap-2 sm:gap-3">
        {/* INPUT WRAPPER */}
        <div className="relative flex-1">

          <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handelImage}/>

          <button onClick={()=> imageInputRef.current.click()} type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <Camera size={16} />
          </button>

          {/* Right icon */}
          {/* <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <Smile size={16} />
          </button> */}

          {/* Input */}
          <input
            type="text"
            value={inputText}
            placeholder="Type a message..."
            className="
              input w-full
              bg-slate-950/50 border-none ring-1 ring-slate-800
              text-white text-sm
              pl-10 pr-10
            "
            onChange={(e)=> setInputText(e.target.value)}
          />
        </div>

        {/* Send button */}
        <button type="submit" className="btn btn-primary btn-sm sm:btn-md bg-blue-600 hover:bg-blue-500 border-none">
          <Send size={16} />
        </button>

      </form>
    </div>
  );
}

export default MessageInputBar;


