import React, { Component } from 'react';
import Layout, { Header, Footer, Content } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Affix from 'antd/lib/affix';
import Card from 'antd/lib/card';

import OverviewWidget from './widgets/OverviewWidget.js'
import JvmWidget from './widgets/JvmWidget.js'
import RequestsWidget from './widgets/RequestsWidget.js'
import MetricsWidget from './widgets/MetricsWidget.js'
import LogWidget from './widgets/LogWidget.js'

import './App.scss';
import logo from './dropwizard.png';

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
            }));
    }

    render() {
        return (
<table>
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
</table>
        );
    }
}

export default App;
