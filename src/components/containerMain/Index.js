import React, {Component} from 'react';
import {Switch} from "react-router-dom";
import PrivateRouter from "../privateRouter/Index";
import Components from "./components";

class ContainerMain extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Switch>
                {Components.map(itm => {
                    return <PrivateRouter key={itm.path} component={itm.component} exact path={itm.path}/>
                })}
            </Switch>

        );
    }
}


export default ContainerMain;
