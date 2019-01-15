const crypto = require("crypto");

module.exports = {
    getHashedPassword : function(password, salt){
        const length = 16;

        if (!salt) {
            const randomSalt = crypto.randomBytes(Math.ceil(length / 2))
                .toString('hex')
                .slice(0, length);
    
            salt = randomSalt;
        }
    
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let passwordHash = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: passwordHash
        };
    }
}