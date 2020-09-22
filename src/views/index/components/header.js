import React, {PureComponent} from 'react';
import "./Aside.scss"
import {MenuFoldOutlined} from "@ant-design/icons"

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {collapsed, toggle} = this.props;
        return (
            <div className={collapsed ? "collapsed-close" : ""}>
                <h1 className="logo"><span>LOGO</span></h1>
                <div className="header-wrap">
                    <span className="collapsed-icon" onClick={toggle}>< MenuFoldOutlined/></span>
                </div>
            </div>
        );
    }
}

export default Header;
