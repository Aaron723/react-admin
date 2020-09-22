import React, {PureComponent, Fragment} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";
import Router from "../../router/index"
import {withRouter} from "react-router-dom"
const {SubMenu} = Menu

class AsideMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:[],
            openKeys:[],
        };

    }
    componentDidMount() {
        const pathname = this.props.location.pathname;
        const menu = pathname.split('/').slice(0, -1).join('/');
        const menuHigh = {
            selectedKeys: pathname,
            openKeys:menu,
        }
        this.selectMenuHigh(menuHigh);
    }
    selectMenu = ({item, key, keyPath, domEvent}) => {
        const menuHigh = {
            selectedKeys: key,
            openKeys:keyPath[keyPath.length - 1],
        }
        this.selectMenuHigh(menuHigh);
    }
    selectMenuHigh = ({selectedKeys, openKeys}) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys:[openKeys],
        });
    }
    openMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]],
        })
    }
    //子菜单处理
    renderSubMenu = ({key, title, child}) => {
        return (<SubMenu key={key} title={title}>
            {child && child.map(item => {
                return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
            })}
        </SubMenu>)
    }
    //无子菜单处理
    renderMenu = ({key, title}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    render() {
        const {selectedKeys, openKeys} = this.state
        return (
            <Fragment>
                <Menu theme="dark"
                      onOpenChange={this.openMenu}
                      selectedKeys={selectedKeys}
                      openKeys={openKeys}
                      mode="inline"
                      onClick={this.selectMenu}
                >
                    {Router && Router.map(firstItem => {
                        return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                    })}
                </Menu>
            </Fragment>
        );
    }
}

export default withRouter(AsideMenu);
