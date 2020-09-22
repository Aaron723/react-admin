import React, {Component, Fragment} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import "./index.scss"
import {reg_password} from "../../utils/validate"
import {withRouter} from "react-router-dom"
//API
import {Login} from "../../api/account";
import Code from "../../components/code";
import CryptoJs from "crypto-js"
//方法
import {setToken, setUsername} from "../../utils/cookies";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "login",
            loading: false,
        };
    }

    toggleForm = () => {
        this.props.switchForm("register")
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
    //登录
    onFinish = (value) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code,
            module: this.state.module,
        }
        this.setState({loading: true})
        Login(requestData).then(response => {
            let data = response.data.data;
            setToken(data.token);
            setUsername(data.username);
            this.setState({loading: false});
            this.props.history.push("/index");
        }).catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }
    //输入变化
    inputChange = (e) => {
        this.setState({username: e.target.value})
    }

    render() {
        const {username, module, loading} = this.state
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
                            <Input onChange={this.inputChangeUsername}
                                   prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="请输入邮箱"/>
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={
                                       [
                                           {required: true, message: '密码不能为空'},
                                           {pattern: reg_password, message: "6~20位字母与数字的组合"}
                                       ]
                                   }>
                            <Input onChange={this.inputChangePassword} type="password"
                                   prefix={<UnlockOutlined className="site-form-item-icon"/>}
                                   placeholder="请输入密码"/>
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
                                    <Input onChange={this.inputChangeCode}
                                           prefix={<UnlockOutlined className="site-form-item-icon"/>}
                                           placeholder="验证码"/>
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button"
                                    block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(LoginForm);
