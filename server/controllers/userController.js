const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator")

module.exports.register = async (req, res, next) => {
    try {
        // Extract user input from the request body
        const { username, email, password } = req.body;

        // Validate email format using the validator library
        // if (!validator.isEmail(email)) {
        //     return res.json({ msg: "Invalid email format", status: false });
        //     console.log("invalid email");
        // }

        // Check if the provided username is already in use
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }

        // Check if the provided email is already in use
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }

        // Hash the user's password using bcrypt with a cost factor of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const user = await User.create({
            username,
            email,
            password : hashedPassword,
        });

        // Remove the password field from the user object for security reasons
        delete user.password;

        // Respond with a success message and the created user details
        return res.status(201).json({ status: true, user });
        console.log(user);
    } catch (error) {
        // Handle errors by logging and sending an appropriate response
        console.error(error);
        res.status(500).json({ msg: "User Couldn't be Save", status: false });
    };
};


module.exports.Login = async (req, res, next) => {
    try {
        // Extract user input from the request body
        const { username, password } = req.body;

        // Check if the provided username is already in use
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect username or Passdword", status: false });
        }

        // Check if the provided email is already in use
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({ msg: "Incorrect username or Passdword", status: false });
        }
        
        delete user.password;

        // Respond with a success message and the created user details
        return res.status(201).json({ status: true, user });
        console.log(user);
    } catch (error) {
        // Handle errors by logging and sending an appropriate response
        console.error(error);
        res.status(500).json({ msg: "User Couldn't be Save", status: false });
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const avatarimage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet: true,
            avatarimage,
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image: userData.avatarimage,
        })
    }catch( ex){
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "email",
          "username",
          "avatarimage",
          "_id",
        ]);
        return res.json(users);
    }catch(ex){
        next(ex)
    }
}