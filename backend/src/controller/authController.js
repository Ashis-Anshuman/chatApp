import User from "./models/userModel.js";

export const signUp = async (req, res)=>{
    const {fullName, email, password} = req.body

    try {
        if(!fullName || !email || !password){
        return res.staus(400).json({message : "All field are required!!"});
        }

        if(password.length<8){
            return res.staus(400).json({message : "Password atleast 8 character"});
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            return res.staus(400).json({message : "Invalid email"})
        }

        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.staus(400).json({message : "Existing user"});
        }

        
    } catch (error) {
        
    }

    
}