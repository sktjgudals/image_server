const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require("./config").secretKey;
const options = require("./config").options;

type User = {
  userId: Number;
  displayName: String;
  profileImage: String;
  roles: String[];
  email: String;
};

module.exports = {
  sign: async (info: User) => {
    const payload = {
      userId: info.userId,
      displayName: info.displayName,
      profileImage: info.profileImage,
      email: info.email,
      roles: ["USER"],
    };

    const result = {
      token: jwt.sign(payload, secretKey, options),
      refreshToken: randToken.uid(256),
    };

    return result;
  },
  verify: async (token: any) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        console.log("유효기간 완료 토큰 입니다.");
      } else if (error.message === "invalid token") {
        console.log("유효하지 않은 토큰입니다.");
      } else {
        console.log("유효하지 않은 토큰입니다.");
      }
    }

    return decoded;
  },
};
