function generateRememberMeToken() {
  const tokenLength = 64;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
  let token = '';

  // generate a random token using the specified character set
  for (let i = 0; i < tokenLength; i++) {
    token += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return token;
}

module.exports = generateRememberMeToken;
