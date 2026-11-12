const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("Invalid email address");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
    
};

const validateEditProfileData = (req) => {
    const allowedEditField = [

        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];
    const isEditAllowed = Objectkeys(req.body).every((field)=>allowedEditField.includes(field));
    return isEditAllowed;
};

module.exports ={
    validateSignUpData,validateEditProfileData,
}