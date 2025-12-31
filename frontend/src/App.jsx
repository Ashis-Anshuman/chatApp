import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useUserAuthStore } from './store/userAuthStore';
import PageLoader from './components/PageLoader';
import { Toaster } from 'react-hot-toast';


function App() {
  const {checkAuth, authUser, isCheckingAuth } = useUserAuthStore();

  useEffect(()=>{
    checkAuth();
  },[])

  if(isCheckingAuth){return <PageLoader/>}

  return (
    <div className="min-h-screen bg-slate-950 relative flex justify-center items-center p-4 overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-red-700 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-blue-800 opacity-20 blur-[100px]" />

      <Routes>
        <Route path='/' element={authUser ? <ChatPage/> : <Navigate to = {"/login"}/>} />
        <Route path='/signUp' element={!authUser ?<SignUpPage/> : <Navigate to = {"/"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to = {"/"}/>}/>
        <Route path='*' element={<Navigate to = {authUser ? "/" : "/login"}/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
