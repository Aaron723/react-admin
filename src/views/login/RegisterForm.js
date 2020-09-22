import React, {Component, Fragment} from 'react';
import {Form, Input, Button, Row, Col, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import {validate_password} from "../../utils/validate";
import "./index.scss"
import Code from "../../components/code";
//API
import {Register} from "../../api/account";
//加密
import CryptoJs from "crypto-js"

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            code:"",
            module:"register",
        }
    }

    toggleForm = () => {
        this.props.switchForm("login")
    }
    inputChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }
    inputChangePassword = (e) => {
        this.setState({password: e.target.value})
    }
    inputChangeCode = (e) => {
        this.setState({code: e.target.value})
    }
    onFinish = (value) => {
        const requestData = {
            username:this.state.username,
            password:CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code,
            module: this.state.module,
        }
        Register(requestData).then(response => {
            let data = response.data
            message.success(data.message, 1);
            console.log(response)
            if (data.resCode === 0) {
                this.toggleForm();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username"
                                   rules={[
                                       {required: true, message: '邮箱不能为空'},
                                       {type: "email", message: "邮箱格式不正确"}
                                   ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} onChange={this.inputChangeUsername}
                                   placeholder="请输入邮箱"/>
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={[
                                       {required: true, message: '密码不能为空'},
                                       (({getFieldValue}) => ({
                                           validator(rule, value) {
                                               let passwords_value = getFieldValue("passwords"); // 获取再次输入密码的值
                                               if (!validate_password(value)) {
                                                   return Promise.reject("6~20位字母与数字的组合");
                                               }
                                               if (passwords_value && value !== passwords_value) {
                                                   return Promise.reject("两次密码输入不一致");
                                               }
                                               return Promise.resolve();
                                           }
                                       }))
                                   ]}>
                            <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon"/>} onChange={this.inputChangePassword}
                                   placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item name="passwords"
                                   rules={[
                                       {required: true, message: '第二次输入密码不能为空'},
                                       (({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (value !== getFieldValue("password")) {
                                                   return Promise.reject("两次密码输入不一致");
                                               }
                                               return Promise.resolve();
                                           }
                                       }))
                                   ]}>
                            <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon"/>}
                                   placeholder="请再次输入密码"/>
                        </Form.Item>
                        <Form.Item name="code"
                                   rules={[
                                       {required: true, message: '请输入长度为6的验证码', len: 6},
                                   ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon"/>} onChange={this.inputChangeCode}
                                           placeholder="验证码"/>
                                </Col>
                                <Col span={9}>
                                    <Code username={this.state.username} module={this.state.module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default RegisterForm;
