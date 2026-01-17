import React, { useCallback, useRef, useState } from "react";
import { Camera, Send, Smile, XIcon } from "lucide-react";
import { useChatStore } from "../store/chatStore";


function MessageInputBar() {
  const imageInputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [inputImg, setInputImg] = useState(null);
  // const {isSoundEnabled, sendMessage} = useChatStore();
  const sendMessage = useChatStore((s)=>s.sendMessage);

  const handelImage = useCallback((e)=> {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = () => {setInputImg(reader.result)}
    reader.readAsDataURL(file);
  },[]);

  const handelSendMessage = useCallback((e)=>{
    e.preventDefault();
    if(!inputText.trim() && !inputImg) return;
    sendMessage({
      text: inputText.trim(),
      image: inputImg
    })
    setInputText("");
    setInputImg(null);
    if(imageInputRef.current){imageInputRef.current.value = ""};
  },[inputText, inputImg, sendMessage]);

  const removeImg = ()=>{
    setInputImg(null);
    if(imageInputRef.current){imageInputRef.current.value = ""};
  }

  return (
    <div className="shrink-0 p-3 sm:p-4 border-t border-slate-800">
      {inputImg && (
        <div className="max-w-6xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={inputImg}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handelSendMessage} className="flex items-center gap-2 sm:gap-3">
        {/* INPUT WRAPPER */}
        <div className="relative flex-1">

          <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handelImage}/>

          <button onClick={()=> imageInputRef.current.click()} type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <Camera size={16} />
          </button>

          {/* Input */}
          <input
            type="text"
            value={inputText}
            placeholder="Type a message..."
            className="
              input w-full
              bg-slate-950/50 border-none border border-slate-800
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

export default React.memo(MessageInputBar);


