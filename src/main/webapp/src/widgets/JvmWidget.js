import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from './AbstractWidget.js';

import HeapWidget from './jvm/HeapWidget.js'
import ClassesWidget from './jvm/ClassesWidget.js'
import ThreadsWidget from './jvm/ThreadsWidget.js'

class JvmWidget extends AbstractWidget {
      
    constructor(props) {
        super(props);

        this.data = [];
    }
    
    render() {
        const name = this.getGauge('jvm.attribute.name');
        
        const vendor = this.getGauge('jvm.attribute.vendor');
        
        const uptime = this.getGauge('jvm.attribute.uptime');
        const uptimePretty = uptime ? prettyMs(uptime) : "-";
        
        return (
            <Card title="JVM" extra={vendor} className="dwm-jvm">
                <Card.Grid style={{ width: '100%' }}>
                    <HeapWidget data={this.props.data}/>
                </Card.Grid>
                <Card.Grid style={{ width: '50%' }}>
                    <ClassesWidget data={this.props.data}/>
                </Card.Grid>
                <Card.Grid style={{ width: '50%' }}>
                    <ThreadsWidget data={this.props.data}/>
                </Card.Grid>
            </Card>
        );
    }
}

export default JvmWidget;
