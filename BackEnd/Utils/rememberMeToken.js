function generateRememberMeToken() {
    const tokenLength = 64; // number of characters in the token
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // possible characters in the token
    let token = '';

    // generate a random token using the specified character set
    for (let i = 0; i < tokenLength; i++) {
      token += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return token;
}

module.exports = generateRememberMeToken();