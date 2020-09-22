import React, {Component, Fragment} from 'react';
import {Button, Form, Input, message, Switch} from "antd";
import {Status} from "../../api/department";
import {Link} from "react-router-dom";
import TableComponent from "../../tableData/Index";

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //默认参数
            pageNumber: 1,
            pageSize: 10,
            keyWord: "",
            //表格加载
            tableLoading: false,
            //开关是否在进行异步操作
            flag:false,
            //id
            id: "",
            //表格配置项
            tableConfig: {
                url:"departmentList",
                checkbox:true,
                method:"post",
                rowKey:"id",
                thead: [
                    {title: "部门名称", dataIndex: "name", key: "name"},
                    {
                        title: "禁/启用",
                        dataIndex: "status",
                        key: "status",
                        render: (text, rowData) => {
                            return <Switch checkedChildren="启用"
                                           unCheckedChildren="禁用"
                                           onChange={() => {
                                               this.onHandleSwitch(rowData);
                                           }}

                                           defaultChecked={rowData.status === "1"}
                                           loading={this.state.id === rowData.id && this.state.flag}
                            />
                        }
                    },
                    {title: "人员数量", dataIndex: "number", key: "number"},
                    {
                        title: "操作",
                        dataIndex: "operation",
                        key: "operation", width: 215,
                        render: (text, rowData) => {
                            return (
                                <div className="inline-button">
                                    <Button type="primary">
                                        <Link to={{pathname: "/index/department/add", state: {id: rowData.id,}}}>编辑</Link>
                                    </Button>
                                    <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    },
                ],
            },
            //表头
            data: [],
        }
    }
    getChildRef = (ref) => {
        this.tableComponent = ref;
    }
    //删除
     delete = (id) => {
        //批量删除的处理方式
         this.tableComponent.onHandleDelete();
    }
    //提交表单
    onFinish = (value) => {
        if (this.state.tableLoading) return false;
        this.setState({
            keyWord: value.name,
            pageNumber: 1,
            pageSize: 10,
        });
        // this.loadData();
    }
    //禁启用
    onHandleSwitch = (data) => {
        if (!data.status) return false;
        const requestData = {
            id: data.id,
            status: data.status !== "1",
        }
        this.setState({
            id: data.id,
            flag:true,
        })
        console.log(data.id);
        Status(requestData).then(response => {
            message.info(response.data.message);
            this.setState({
                id: "",
                flag:false,
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                id: "",
                flag:false,
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称"/>
                    </Form.Item>
                    <Form.Item label="搜索">
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <TableComponent onRef={this.getChildRef} config={this.state.tableConfig} batchButton={true} />
                </div>
            </Fragment>

        );
    }
}

export default DepartmentList;
