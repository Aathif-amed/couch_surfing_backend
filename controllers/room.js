import Room from "../models/Room.js"
import tryCatch from "./utlis/tryCatch.js"

export const createRoom =tryCatch( async(req,res)=>{
    const {id:uid,fName:uFname,lName:uLname,photoURL:uPhoto}=req.user
    const newRoom = new Room({...req.body,uid,uFname,uLname,uPhoto})
    await newRoom.save()
    return res.status(201).json({success:true,result:newRoom})
})