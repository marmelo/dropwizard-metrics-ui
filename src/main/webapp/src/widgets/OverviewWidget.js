import React, { Component } from 'react';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { getGauge, getTimer, getMeter, formatTime, formatBytes } from './helpers';

class OverviewWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        const uptime = getGauge('jvm.attribute.uptime', nextProps.data).value;
        const heapUsed = getGauge('jvm.memory.heap.used', nextProps.data).value;
        const heapMax = getGauge('jvm.memory.heap.max', nextProps.data).value;
        const requests = getTimer('io.dropwizard.jetty.MutableServletContextHandler.requests', nextProps.data).count;
        const logs = getMeter('ch.qos.logback.core.Appender.all', nextProps.data).count;

        this.setState(prevState => ({
            uptime: uptime,
            heapUsed: heapUsed,
            heapMax: heapMax,
            requestsTotal: requests,
            requestsRate: requests - prevState.requestsTotal,
            logsTotal: logs,
            logsRate: logs - prevState.logsTotal
        }));
    }

    render() {
        return (
            <Row gutter={16}>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Uptime</span>
                        {formatTime(this.state.uptime)}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Heap</span>
                        {formatBytes(this.state.heapUsed)} out of {formatBytes(this.state.heapMax)}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Requests</span>
                        {this.state.requestsRate} reqs/s out of {this.state.requestsTotal}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Logs</span>
                        {this.state.logsRate} logs/s out of {this.state.logsTotal}
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default OverviewWidget;
