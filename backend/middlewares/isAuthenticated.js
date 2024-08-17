import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("in middleware auth header",authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const token = authHeader.split(' ')[1];
    console.log("token in middleware",token);
    console.log(process.env.SECRET_KEY);
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    console.log("req.id in middleware",req.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAuthenticated;


















// import jwt from 'jsonwebtoken';


// const isAuthenticated = async (req,res,next) => {
//     try {
//         const token = req.cookies.token;
//         // const token = req.headers.authorization;
//         console.log(token);
//         // const spllitedToken =  token.split(' ')[1];

//         if(!token){
//             return res.status(401).json({
//                 message:'User not authenticated.',
//                 success:false
//             })
//         }
//         // token 
//         const decode =  jwt.verify( token , process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:'Invalid token.',
//                 success:false
//             })
//         }

//         req.id = decode.userId;
//         next();
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default isAuthenticated;