//建立上下文关系
let components = [];
//声明组件对象
const files = require.context("../../views/", true, /\.js$/);
files.keys().map(key => {
    //过滤login，index
    if (key.includes("./index/") || key.includes("./login/")) return false
    //分割字符串
    const splitFilesName = key.split(".");
    let jsonObj = {};
    //path
    const path = `/index${splitFilesName[1].toLowerCase()}`;
    //component
    const component = files(key).default;
    //写入对象
    jsonObj.path = path;
    jsonObj.component = component;
    components.push(jsonObj);
    return false
})
export default components;
