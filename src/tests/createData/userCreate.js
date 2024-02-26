const User = require("../../models/user");
const userCreate = async () => {
    
    await User.create(
        {
            firstName:'Luis',
            lastName:'Gonzalez',
            email:'luis@luis',
            password:'luis123',
            phone: '123456789'
        }
    )
}

module.exports = userCreate