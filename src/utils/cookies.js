import cookies from "react-cookies"
//存储token
const token = "adminToken";
const username = "username";
export function setToken(value) {
    cookies.save(token, value);
}
//读取token
export function getToken() {
    return cookies.load(token);
}
//读取username
export function getUsername() {
    return cookies.load(username);
}
//存储username
export function setUsername(value) {
    cookies.save(username, value);
}
