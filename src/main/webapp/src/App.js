import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Affix from 'antd/lib/affix';
import Card from 'antd/lib/card';

import OverviewWidget from './widgets/OverviewWidget.js'
import JvmWidget from './widgets/JvmWidget.js'
import RequestsWidget from './widgets/RequestsWidget.js'
import MetricsWidget from './widgets/MetricsWidget.js'
import LogWidget from './widgets/LogWidget.js'

import './App.css';
import logo from './dropwizard.png';

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
                ts: new Date(),
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
                        <img src={logo} className="logo"/>
                        <div className="title">Dropwizard Metrics</div>
                        <span className="timestamp">{ this.state.ts && this.state.ts.toGMTString() }</span>
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
                            <RequestsWidget data={this.state.data}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <LogWidget data={this.state.data}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <MetricsWidget data={this.state.data}/>
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
