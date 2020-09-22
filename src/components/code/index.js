import React, {PureComponent} from 'react';
import {Button, message} from "antd";
import {GetCode} from "../../api/account";
import {validate_email} from "../../utils/validate";


class Code extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: false,
        }
    }
    timer = null;
    getCode = () => {
        const username = this.props.username;
        if (!username) {
            message.warning("邮箱不能为空", 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning("邮箱不能为空", 1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: "发送中"
        })
        const requestData = {
            username,
            module: this.props.module,
        }
        GetCode(requestData).then(response => {
            message.success(response.data.message);
            //执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新获取"
            })
            console.log(error);
        })
    }
    countDown = () => {
        let sec = 60;
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}s`,
        })
        this.timer = setInterval(() => {
            sec--;
            if (sec <= 0) {

                this.setState({
                    button_disabled: false,
                    button_text: "重新获取",
                })
                clearInterval(this.timer);
                return false;
            }
            this.setState({
                button_text: `${sec}s`,
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const {button_loading, button_disabled, button_text} = this.state
        return <Button type="danger" loading={button_loading} disabled={button_disabled}
                       block onClick={this.getCode}>{button_text}</Button>;
    }
}

export default Code;
