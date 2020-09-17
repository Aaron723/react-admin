import React, {Component, Fragment} from 'react';
import {Form, Input, Button, Row, Col, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import "./index.scss"
import {VALIDATE_PASSWORD} from "../../utils/validate"
//API
import {Login, GetCode} from "../../api/account";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            code_button_loading: false,
            code_button_disabled: false,
            code_button_text: "获取验证码",
        };
    }

    toggleForm = () => {
        this.props.switchForm("register")
    }
    //登录
    onFinish = (value) => {
        Login(value).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        console.log(value)
    }
    //输入变化
    inputChange = (e) => {
        this.setState({username: e.target.value})
    }
    //获取验证码
    getCode = () => {
        if (!this.state.username) {
            message.warning("邮箱不能为空");
            return false;
        }
        this.setState({
            code_button_loading: true,
            code_button_text: "发送中"
        })
        const requestData = {
            username: this.state.username,
            module: "login",
        }
        GetCode(requestData).then(response => {
            //执行倒计时
            this.countDown();
            console.log(response);
        }).catch(error => {
            this.setState({
                code_button_loading: false,
                code_button_text: "重新获取"
            })
            console.log(error);
        })
    }
    countDown = () => {
        let timer = null;
        let sec = 60;
        this.setState({
            code_button_loading: false,
            code_button_disabled: true,
            code_button_text: `${sec}s`,
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {

                this.setState({
                    code_button_disabled: false,
                    code_button_text: "重新获取",
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text: `${sec}s`,
            })
        }, 1000)
    }

    render() {
        const {code_button_loading, code_button_text, code_button_disabled} = this.state;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username"
                                   rules={
                                       [
                                           {required: true, message: '邮箱不能为空'},
                                           {type: "email", message: "邮箱格式不正确"}
                                           // ({getFieldValue}) => ({
                                           //     validator(rule, value) {
                                           //         if(validate_email(value)) {
                                           //             _this.setState({code_button_disabled: false});
                                           //             return Promise.resolve();
                                           //         }
                                           //         return Promise.reject("邮箱格式不正确");
                                           //     }
                                           // })

                                       ]
                                   }>
                            <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="email"/>
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={
                                       [
                                           {required: true, message: '密码不能为空'},
                                           {pattern: VALIDATE_PASSWORD, message: "6~20位字母与数字的组合"}
                                       ]
                                   }>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon"/>}
                                   placeholder="Password"/>
                        </Form.Item>
                        <Form.Item name="code"
                                   rules={
                                       [
                                           {required: true, message: '验证码不能为空'},
                                           {len: 6, message: '请输入长度为6的验证码'}
                                       ]
                                   }>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon"/>}
                                           placeholder="验证码"/>
                                </Col>
                                <Col span={9}>
                                    <Button type="danger" loading={code_button_loading} disabled={code_button_disabled}
                                            block onClick={this.getCode}>{code_button_text}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default LoginForm;
