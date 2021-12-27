const bcrypt = require('bcryptjs')

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(15);
    return bcrypt.hash(password, salt);
}

const isMatched = async (hashedPassword, password)=> {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    isMatched
}