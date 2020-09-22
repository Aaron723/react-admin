import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./views/login/index";
import Index from "./views/index/Index";
import PrivateRouter from "./components/privateRouter/Index";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="test">
                <BrowserRouter>
                    <Switch>
                        <Route render={() => <Login />} exact path="/"/>
                        <PrivateRouter component={Index} path="/index" />
                    </Switch>
                </BrowserRouter>
            </div>

        );
    }
}


export default App;
