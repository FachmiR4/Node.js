const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data){this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handlerNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message': "username and password must be required"});
    // check for duplicate usernames in the db
    const duplicate = userDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409); // conflict
    try{
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // const the new user
        const newUser = {'username': user, 'password': hashedPwd};
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({'success': `New user ${user} created!`});
    }catch(err){
        res.status(500).json({'message': err.message})
    }
}

module.exports = { handlerNewUser }