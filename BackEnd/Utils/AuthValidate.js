const Ajv = require("ajv").default;
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[a-zA-Z\s]{3,30}$"
    },
    phone: {
      type: "string",
      pattern: "^01[0125][0-9]{8}$"
    },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,}){1,}$"
    },
    password: {
      type: "string",
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d$!%*#?&@]{8,}$"
    },
  },
  required: ["name", "email", "password"],
};

module.exports = ajv.compile(userSchema);





