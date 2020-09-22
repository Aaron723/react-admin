import React, {Component} from 'react';
import {Layout} from "antd";
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/header";
import "./layout.scss"
import ContainerMain from "../../components/containerMain/Index";

const {Sider, Header, Content} = Layout

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }
    componentDidMount() {
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"));
        this.setState({collapsed});
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
        sessionStorage.setItem("collapsed", collapsed.toString());
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader collapsed={this.state.collapsed} toggle={this.toggleCollapsed}/></Header>

                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}><LayoutAside/></Sider>
                    <Content className="layout-main">
                        <ContainerMain/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;
