export const ENV = {
  username: process.env.USERNAME_HRM ?? "",
  password: process.env.PASSWORD_HRM ?? "",
};

export const testData = [
  { username: "invalidusername", password: "admin123"},
  { username: "Admin", password: "invalidpassword"},
]
