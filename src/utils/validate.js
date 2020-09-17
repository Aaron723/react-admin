export const VALIDATE_PASSWORD = /^[\w]{6,20}$/
const reg_email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// const validatePassword = ({getFieldValue}) => ({
//     validator(rule, value) {
//         if (typeof value === "undefined" || value.length < 6) {
//             return Promise.reject("不能小于6位");
//         } else if (value.length > 20) {
//             return Promise.reject("不能大于20位");
//         } else {
//             let pattern = {alpha: 0, num: 0};
//             for (let itm of value) {
//                 if (itm >= '0' && itm <= '9') pattern.num += 1;
//                 else if ((itm >= 'a' && itm <= 'z') || (itm >= 'A' && itm <= 'Z')) pattern.alpha += 1
//             }
//             if (pattern.num === 0 || pattern.alpha === 0) return Promise.reject("需要是数字与字母的组合")
//             else return Promise.resolve()
//         }
//     }
// })
//验证邮箱
export const validate_email = (value) => {
    return reg_email.test(value);
}
