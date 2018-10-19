import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import prettyMs from 'pretty-ms';

import AbstractWidget from './AbstractWidget.js';

class OverviewWidget extends AbstractWidget {
    
    render() {
        const name = this.getGauge('jvm.attribute.name');
        
        const vendor = this.getGauge('jvm.attribute.vendor');
        
        const uptime = this.getGauge('jvm.attribute.uptime');
        const uptimePretty = uptime ? prettyMs(uptime, { secDecimalDigits: 0 }) : "-";
        
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
                        <span>Requests</span>
                        -
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Logs</span>
                        -
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dwm-overview">
                        <span>Health</span>
                        -
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default OverviewWidget;
