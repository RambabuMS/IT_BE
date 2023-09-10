const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userLogin = async(req,res,next)=>{
    const {username,password} = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Generate and return a JWT token upon successful authentication
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token: token,role: user.role, userId : user._id,name: user.username});
      });
}

exports.userRegister = async (req, res) => {
    const { username, password, role } = req.body;
  
    // Check if the username is already exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    // Hash the password
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Create a new user object
      const newUser = {
        username,
        password: hashedPassword,
        role,
      };

      await Users.create(newUser);
  
      res.status(201).json({ message: 'User created successfully' });
    });
  };
