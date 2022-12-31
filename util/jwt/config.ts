const jwtConfig = {
  secretKey: process.env.SECRET_KEY,
  options: { algorithm: "HS256", expiresIn: "7d", issuer: "issuer" },
};

module.exports = jwtConfig;
