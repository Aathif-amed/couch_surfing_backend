import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken'

const client= new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const auth= async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const googleToken = token.length>1000
        if(googleToken){
            // google one tap users
            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:process.env.GOOGLE_CLIENT_ID
            })
            console.log(ticket);
            const payload = ticket.getPayload()
            req.user={id:payload.sub,name:payload.name,photoURL:payload.picture}
        }
        else{
           const decodedToken= jwt.verify(token,process.env.JWT_SECRET)
           const { id,fName, lName, photoURL }=decodedToken
           req.user={id,fName,lName,photoURL}
        
            }
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false,message:'Invalid Token or Token Expired '})
    }
}

export default auth