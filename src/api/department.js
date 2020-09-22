import service from "../utils/request";
//新增部门
export function DepartmentAddApi(data) {
    return service.request({
        url:"/department/add/",
        method:"post",
        data,
    })
}
//获取列表
export function GetList(data) {
    return service.request({
        url:data.url,
        method:"post",
        data,
    })
}

export function Delete(data) {
    return service.request({
        url:"/department/delete/",
        method:"post",
        data,
    })
}
//改变禁用/启用状态
export function Status(data) {
    return service.request({
        url:"/department/status/",
        method:"post",
        data,
    })
}
//部门详情
export function Detailed(data) {
    return service.request({
        url:"/department/detailed/",
        method:"post",
        data,
    })
}
//编辑部门
export function Edit(data) {
    return service.request({
        url:"/department/edit/",
        method:"post",
        data,
    })
}
