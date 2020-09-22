import React, {PureComponent} from 'react';
import {Button, Form, Input, InputNumber, message, Radio} from "antd";
import {DepartmentAddApi} from "@/api/department";
import {Detailed, Edit} from "../../api/department";

class DepartmentAdd extends PureComponent {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            id: "",
            formLayout: {
                labelCol: {span: 2},
                wrapperCol: {span: 20},
            },
            loading: false,
        }
    }

    componentDidMount() {
        this.getDetailed();
    }

    getDetailed = () => {
        if (!this.props.location.state) return false;
        Detailed({id: this.props.location.state.id}).then(response => {
            this.form.current.setFieldsValue(response.data.data);
            this.setState({id: this.props.location.state.id});
        }).catch(error => {
            console.log(error);
        })
    }

    onSubmit = (value) => {
        this.setState({loading: true});
        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value);

    }
    //添加信息
    onHandleAdd = (value) => {
        DepartmentAddApi(value).then(response => {
            message.info(response.data.message);
            this.setState({loading: false});
            this.form.current.resetFields();
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        })
    }
    //编辑信息
    onHandleEdit = (value) => {
        const requestData = value;
        requestData.id = this.state.id;
        console.log(requestData);
        Edit(requestData).then(response => {
            message.info(response.data.message);
            this.setState({loading: false});
            this.form.current.resetFields();
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        })
    }

    render() {
        return (
            <Form ref={this.form}
                  onFinish={this.onSubmit}
                  {...this.state.formLayout}
                  initialValues={{number: 20, status: true}}
            >
                <Form.Item label="部门名称" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber min={0} max={100}/>
                </Form.Item>
                <Form.Item label="禁启用状态" name="status">
                    <Radio.Group>
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default DepartmentAdd;
