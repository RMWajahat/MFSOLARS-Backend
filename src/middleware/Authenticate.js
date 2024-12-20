const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./asyncErrors");
const jwt = require('jsonwebtoken');
const User_Model = require('../models/userModel');


const AuthenticateUser = catchAsyncErrors(async (req, res, next) => {
    let token = await req.cookies;
    token = token['token']; // token is saved in cookies so we are accessing it from cookies

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // ab agr token hai tou uss token sa user nikalain ga 
    // like 
    const decodedData = jwt.verify(token, process.env.JWT_SECRET); // it verifies that it's valid token or not 
    // if yes then we will search in user on the base of this by accessing its id ..... we made jwt token using user id ----- look responseWithToken.js for this that we used current user to create token
    req.user = await User_Model.findById(decodedData.id); // it will find the user on the base of id and save it in req.user
    next(); // next call krain ga jo next middleware hai uss ka
});



const isUserAdmin = (role) => {
    return (req, res, next) => {
        if ((req.user.role.toLowerCase()) !== (role.toLowerCase())) {    // q k hm na req mein user ki info save ki hui hai   aur scheam ma user ka role b define hai So udr sa pta chal jana k admin hai k nahin 
            return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resource`, 403));
        }
        next();
    }
}

module.exports = {
    AuthenticateUser,
    isUserAdmin
};