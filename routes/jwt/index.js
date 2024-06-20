const jwt = require("jsonwebtoken");
const md5 = require("js-md5");
const SECRET_KEY = "XIAOBAI-ABC-SITE-JWT-KEY";

const TokenUtil = (function () {
  return {
    sign: function (username) {
      const token = jwt.sign(
        {
          username,
          iss: "node",
          sub: "jcg",
          iat: Date.now() / 1000,
          exp: Date.now() / 1000 + 60 * 60 * 24
          //
        },
        SECRET_KEY,
        { algorithm: "HS256" }
      );
      return token;
    },

    verify: function (token) {
      // const decoded = jwt.verify(token, SECRET_KEY);
      // console.log(decoded);
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
      } catch (err) {
        return false;
      }
    }
  };
})();

// （Payload）说明
// { "iss": "Online JWT Builder",
//   "iat": 1416797419,
//   "exp": 1448333419,
//   "aud": "www.example.com",
//   "sub": "jrocket@example.com",
//   "GivenName": "Johnny",
//   "Surname": "Rocket",
//   "Email": "jrocket@example.com",
//   "Role": [ "Manager", "Project Administrator" ]
// }
// * iss: 该JWT的签发者，是否使用是可选的；
// * sub: 该JWT所面向的用户，是否使用是可选的；
// * aud: 接收该JWT的一方，是否使用是可选的；
// * exp(expires): 什么时候过期，这里是一个Unix时间戳，是否使用是可选的；
// * iat(issued at): 在什么时候签发的(UNIX时间)，是否使用是可选的；其他还有：
// * nbf (Not Before)：如果当前时间在nbf里的时间之前，则Token不被接受；一般都会留一些余地，比如几分钟；，是否使用是可选的；

module.exports = { TokenUtil };
