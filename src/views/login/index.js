import React, {Component} from 'react';
import "./index.scss"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: "login"
        }
    }

    switchForm = (value) => {
        this.setState({formType: value})
        console.log(value)
    }

    render() {
        return (
            <div className="form-wrap">
                <div>
                    {this.state.formType === "login" ? <LoginForm switchForm={this.switchForm}/> :
                        <RegisterForm switchForm={this.switchForm}/>}
                </div>
            </div>
        );
    }
}

export default Login;
