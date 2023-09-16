const jwt = require("jsonwebtoken");

const secretKey = "asdaklnsadadasdasm";

const token = jwt.sign({ name: "Guilherme" }, secretKey, {
  subject: "1",
  expiresIn: "1y",
});

const generatedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VpbGhlcm1lIiwiaWF0IjoxNjk0ODIxOTU5LCJleHAiOjE3MjYzNzk1NTksInN1YiI6IjEifQ.keJnf1H0DkF8dKZ9iaTXnY2bFVeTCcibhFHFWnpigG8";

console.log(token);

console.log(jwt.verify(generatedToken, secretKey));
// console.log(jwt.verify(generatedToken, 'other key')); error invalid key
console.log(jwt.decode(generatedToken));
console.log(
  jwt.decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  )
);
