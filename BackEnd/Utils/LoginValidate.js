const Ajv = require("ajv").default;
var ajv = new Ajv();
userSchema = {
    "type":"object",
    "properties":{
        email: {
            type: "string",
            pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com){1}$"
        },
        password: {
            type: "string",
            pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d$!%*#?&@]{8,}$"
        },
        rememberMe: {
            type: "boolean",
        }
    },
    "required":["email","password"]
}

module.exports = ajv.compile(userSchema);