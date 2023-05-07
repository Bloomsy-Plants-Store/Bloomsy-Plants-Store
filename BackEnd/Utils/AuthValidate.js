const Ajv = require("ajv").default;
var ajv = new Ajv();
userSchema = {
    "type":"object",
    "properties":{
        "name":{"type":"string","pattern":"^[a-zA-Z\s]{3,30}$"},
        "phone":{"type":"string","pattern":"^01[0-9]{9}$"},
        "email":{"type":"string","pattern":"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        "password":{"type":"string","pattern":"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"}
    },
    "required":["name","phone","email","password"]
}


module.exports = ajv.compile(userSchema);