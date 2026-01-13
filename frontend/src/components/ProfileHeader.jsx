import {useRef, useState} from 'react';
import { Volume2, LogOut, VolumeX, LoaderIcon } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useUserAuthStore } from '../store/userAuthStore';

const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ProfileHeader() {
  const {logout, authUser, updateProfile, isUpdatingProfile} = useUserAuthStore();
  const {toogleSound, isSoundEnabled} = useChatStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handelImageUpload = (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async ()=>{
      console.log("y");
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      const res = await updateProfile({profilePic: base64Image});
      if(!res){
        setSelectedImage(null);
      }
    };
  };

  const handelLogout = ()=>{
    logout();
  }
  return (
    <div className='p-4 flex items-center justify-between border-b border-slate-800 '>
      <div className="flex items-center gap-3">
        <div className="avatar online">

          <button disabled={isUpdatingProfile} className='size-14 rounded-full relative group overflow-hidden ' onClick={() => fileInputRef.current.click()}>
          
            {isUpdatingProfile ? <LoaderIcon size={16} className="ml-2 animate-spin inline-block"/> : <img src={selectedImage || authUser.profilePic || "/avatar.png"} alt="Profile Pic" className="size-full object-cover" />}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">{!isUpdatingProfile ? "Change" : ""}</span>
            </div>

          </button>

          <input type="file" accept='image/*' ref={fileInputRef} className='hidden' onChange={handelImageUpload} />

        </div>
        <div>
          <p className="text-white text-sm font-medium max-w-[150px] truncate">{authUser.fullName}</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className='tooltip tooltip-top' data-tip="Mute/Unmute">
          <button className="text-slate-400 hover:text-slate-200 transition-colors" 
          onClick={()=>{
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error)=>{console.error("Error in Sound", error)});
            toogleSound();
          }}>
            {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}

          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="Logout">
          <button onClick={handelLogout} className="text-red-600 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      

    </div>
    
  )
}

export default ProfileHeader
