import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const googleToken = token.length > 1000;
    if (googleToken) {
      // google one tap users
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        fName: payload.name.split(" ")[0],
        lName: payload.name.split(" ")[1],
        photoURL: payload.picture,
        role: "basic",
      };
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, fName, lName, photoURL, role } = decodedToken;
      req.user = { id, fName, lName, photoURL, role };
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token or Token Expired " });
  }
};

export default auth;
