const Ajv = require("ajv").default;
var ajv = new Ajv();
userSchema = {
    "type":"object",
    "properties":{
        email: {
            type: "string",
            pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com){1}$",
            errorMessage: "Invalid email address."
          },
          password: {
            type: "string",
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            errorMessage: "Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
        },
    },
    "required":["email","password"]
}

module.exports = ajv.compile(userSchema);