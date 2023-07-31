// controllers/appController.js
const UserModel=require('../model/user');
const TaskModel=require('../model/task')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_SECRET = require('../router/config');
console.log("JWT_SECRET is", JWT_SECRET);

async function register(req, res) {
  try {
    const { fullname, email, UserName, Password } = req.body;

    // Check if the username already exists
    const existingUsername = await UserModel.findOne({ UserName });
    if (existingUsername) {
      return res.status(400).json({ error: 'Please use a unique username' });
    }

    // Check if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Please use a unique email' });
    }

    // Validate the password
    if (!Password || Password.trim() === '') {
      return res.status(400).json({ error: 'Please provide a valid password' });
    }

    // Perform additional password complexity checks here if needed

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create and save the new user
    const newUser = new UserModel({
      UserName,
      Password: hashedPassword,
      fullname,
      email,
    });

    await newUser.save();
    return res.status(201).json({ msg: 'User Register Successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  const { UserName, Password } = req.body;
  console.log('Received login request for UserName:', UserName);

  try {
    const user = await UserModel.findOne({ UserName });

    if (!user) {
      console.log('User not found:', UserName);

      return res.status(400).send({ error: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(Password, user.Password);
    console.log('Password matched for UserName:', UserName);

    if (!passwordMatched) {
      return res.status(400).send({ error: "Password does not match" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        UserName: user.UserName,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful",
      UserName: user.UserName,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);

    return res.status(500).send({ error: "Internal Server Error" });
  }
}

async function verifyUser(req, res, next) {
  try {
    const { UserName } = req.body; 
        let exist = await UserModel.findOne({ UserName });
    if (!exist) return res.status(404).send({ error: "can't find username" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication error" });
  }
}

async function getUser(req, res) {
  try {
    const { username } = req.params; // Correctly access the UserName from req.params

    if (!username) {
      return res.status(400).json({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ UserName: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
  
async function updateuser(req, res) {
  const id = req.query.id;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the fields to update from the request body
    const { fullname, email, UserName, Password, RepeatPassword } = req.body;
    const updateFields = {};

    if (fullname) {
      updateFields.fullname = fullname;
    }

    if (email) {
      updateFields.email = email;
    }

    if (UserName) {
      updateFields.UserName = UserName;
    }

    if (Password) {
      updateFields.Password = Password;
    }


    // Update the user in the database
    await UserModel.updateOne({ _id: id }, updateFields);
    return res.status(200).json({ msg: 'Record updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
  
  async function generateOTP(req, res) {
    res.send('generateOTP route'); // Use res.send() to send a simple response
  }
  
  async function verifyOTP(req, res) {
    res.send('verifyOTP route'); // Use res.send() to send a simple response
  }
  
  async function createResetSession(req, res) {
    res.send('createResetSession route'); // Use res.send() to send a simple response
  }
  
  async function resetPassword(req, res) {
    res.send('resetPassword route'); // Use res.send() to send a simple response
  }
  async function deleteTask(req, res) {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      return res.status(200).json({ msg: 'Task deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  module.exports = {
    register,
    login,
    verifyUser,
    getUser,
    updateuser,
    generateOTP,
    verifyOTP,
    createResetSession,
    resetPassword,
    deleteTask
  };
  