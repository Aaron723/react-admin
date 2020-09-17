import React, {Component} from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import Login from "./views/login/index";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="test">
                <HashRouter>
                    <Switch>
                        <Route component={Login} exact path="/"/>
                    </Switch>
                </HashRouter>
            </div>

        );
    }
}


export default App;
