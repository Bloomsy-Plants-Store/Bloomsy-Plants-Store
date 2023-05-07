const Ajv = require("ajv").default;
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[a-zA-Z\\s]{3,30}$",
      errorMessage: "Name should be between 3 and 30 characters.",
    },
    phone: {
      type: "string",
      pattern: "^01[0-9]{9}$",
      errorMessage: "Invalid phone number.",
    },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com){1}$",
      uniqueItems: true,
      errorMessage: "Invalid email address.",
    },
    password: {
      type: "string",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      errorMessage: "Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    },
  },
  required: ["name", "phone", "email", "password"],
};

module.exports = ajv.compile(userSchema);

