import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';

import AbstractWidget from './AbstractWidget.js';

class OverviewWidget extends AbstractWidget {

    constructor(props) {
        super(props);
        
        this.requests = 0;
        this.logs = 0;
    }
    
    render() {
        const uptime = this.getGauge('jvm.attribute.uptime');
        const uptimePretty = uptime ? prettyMs(uptime, { secDecimalDigits: 0 }) : "-";
        
        const heapUsed = this.getGauge('jvm.memory.heap.used') || -1;
        const heapUsedPretty = prettyBytes(heapUsed);
        
        const heapMax = this.getGauge('jvm.memory.heap.max') || -1;
        const heapMaxPretty = prettyBytes(heapMax);
        
        const requests = this.getTimer('io.dropwizard.jetty.MutableServletContextHandler.requests') || {};
        const requestsTotal = requests.count;
        const requestsRate = requestsTotal - this.requests;
        this.requests = requestsTotal;

        const logs = this.getMeter('ch.qos.logback.core.Appender.all') || {};
        const logsTotal = logs.count;
        const logsRate = logsTotal - this.logs;
        this.logs = logsTotal;

        return (
            <Row gutter={16}>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Uptime</span>
                        {uptimePretty}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Heap</span>
                        {heapUsedPretty} out of {heapMaxPretty}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Requests</span>
                        {requestsRate} reqs/s out of {requestsTotal}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Logs</span>
                        {logsRate} logs/s out of {logsTotal}
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default OverviewWidget;
