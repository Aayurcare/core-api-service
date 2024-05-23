const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const{createJsonResponse} = require("../helpers/responseGenerator")
const jwt = require("jsonwebtoken");
const Owner = require("../models/Owner");
const { ERROR } = require("../constants/jsonMessages");

module.exports.registerOwner =  async (owner) =>{
    const { ownerName, contactNumber, password } = owner;

    // Validate user input
    if (!(ownerName && password && contactNumber)) {
      return createJsonResponse(400,"All values should be provided")
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    // check if user already exist
    // Validate if user exist in our database
    const existingOwner = await Owner.findOne({ contactNumber });
    if(existingOwner){
      return createJsonResponse(409, "Contact number already registered, try logging in");
    }
    owner.password = encryptedPassword;
    console.log("After hashing password");
    const createdOwner = await Owner.create(owner);
    delete createdOwner["password"]; //removing the password from response
    
    return createJsonResponse(200,createdOwner);    
}

module.exports.loginOwner =  async (owner) =>{
  try {
    const { contactNumber,password } = owner;
    const fetchedOwner = await Owner.findOne({contactNumber});

    //Restuarant is not found from database
    if(!fetchedOwner){
      return {
        status : 400,
        error : 'Restaurant owner not found' 
      };
    }

    //Check if passwords are equals
    if(await bcrypt.compare(password,fetchedOwner.password)){
      console.log("Logging in",fetchedOwner._id);
      const token = generateJwtToken(fetchedOwner._id);
      return {
        status : 200,
        token : token
      } 
    }

    //Passwords are not matching so providing invalid response
    return {
      status : 400,
      error : 'Invalid password' 
    };
  } catch (error) {
    return createJsonResponse(ERROR,"Some error occured");
  }
}


function generateJwtToken(id) {
  return jwt.sign(
    { id: id },
    "aksjdkasjbdjkasbdj",
    {
      expiresIn: "10d",
    }
  );
}