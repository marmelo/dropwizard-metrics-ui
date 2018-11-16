import React, { Component } from 'react';
import Card from 'antd/lib/card';
import HeapWidget from './jvm/HeapWidget'
import ClassesWidget from './jvm/ClassesWidget'
import ThreadsWidget from './jvm/ThreadsWidget'
import { getGauge } from './helpers';

class JvmWidget extends Component {

    render() {
        const vendor = getGauge('jvm.attribute.vendor', this.props.data).value;

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
