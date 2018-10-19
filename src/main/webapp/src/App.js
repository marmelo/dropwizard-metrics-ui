import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Switch from 'antd/lib/switch';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Affix from 'antd/lib/affix';
import Card from 'antd/lib/card';

import OverviewWidget from './widgets/OverviewWidget.js'
import JvmWidget from './widgets/JvmWidget.js'

import Gauges from './widgets/raw/Gauges.js'
import Counters from './widgets/raw/Counters.js'
import Histograms from './widgets/raw/Histograms.js'
import Meters from './widgets/raw/Meters.js'
import Timers from './widgets/raw/Timers.js'

import mock from './mock/mock.js';
import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: {
                gauges: {},
                counters: {},
                histograms: {},
                meters: {},
                timers: {}
            }
        };
    }
    
    componentDidMount() {
        this.timer();
        this.interval = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount() {
       clearInterval(this.interval);
    }
    
    timer() {
        fetch('/metrics')
            .then(response => response.json())
            .then(responseJson => this.setState({
                data: responseJson
            }))
            .catch(error => this.setState({
                data: {
                    gauges: {},
                    counters: {},
                    histograms: {},
                    meters: {},
                    timers: {}
                },
                error: error
            }));
    }
    
    render() {
        return (
            <Layout>
                <Affix>
                    <Header>
                        <div className="logo"/>
                        <div className="title">Dropwizard Metrics</div>
                        <div className="refresh">
                            <span style={{marginRight: "12px", color: "rgba(255, 255, 255, 0.65)"}}>Auto Refresh</span>
                            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
                        </div>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{lineHeight: '64px' }}>
                            <Menu.Item key="1">Gauges</Menu.Item>
                            <Menu.Item key="2">Counters</Menu.Item>
                            <Menu.Item key="3">Histograms</Menu.Item>
                            <Menu.Item key="4">Metrics</Menu.Item>
                            <Menu.Item key="5">Timers</Menu.Item>
                        </Menu>
                    </Header>
                </Affix>
                <Content style={{margin: '0 40px' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <OverviewWidget data={this.state.data}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <JvmWidget data={this.state.data}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Gauges data={this.state.data.gauges}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Counters data={this.state.data.counters}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Histograms data={this.state.data.histograms}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Meters data={this.state.data.meters}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Timers data={this.state.data.timers}/>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{textAlign: 'center' }}>
                    © 2018 Created by Rafael Marmelo
                </Footer>
            </Layout>
        );
    }
}

export default App;
