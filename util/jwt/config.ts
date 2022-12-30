const jwtConfig = {
  secretKey: process.env.SECRET_KEY,
  options: { algorithm: "HS256", expiresIn: "60m", issuer: "issuer" },
};

module.exports = jwtConfig;
