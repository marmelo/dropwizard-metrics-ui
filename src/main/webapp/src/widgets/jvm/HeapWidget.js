import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getGauge, formatBytes } from '../helpers';

class HeapWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const init = getGauge('jvm.memory.heap.init', nextProps.data).value;
        const used = getGauge('jvm.memory.heap.used', nextProps.data).value;
        const committed = getGauge('jvm.memory.heap.committed', nextProps.data).value;
        const max = getGauge('jvm.memory.heap.max', nextProps.data).value;
        const usage = getGauge('jvm.memory.heap.usage', nextProps.data).value;

        const data = [];
        if (used >= 0) {
            data.push({
                timestamp: new Date().getTime(),
                used: used,
                committed: committed,
                max: max
            });
        }

        this.setState(prevState => ({
            init: init,
            used: used,
            committed: committed,
            max: max,
            usage: usage,
            data: prevState.data.concat(data)
        }));
    }

    render() {
        const extra =
            <>
                <span>Used:</span> {formatBytes(this.state.used)} ({(this.state.usage * 100.0).toFixed(1) + "%"})
                <span>Size:</span> {formatBytes(this.state.committed)}
                <span>Max:</span> {formatBytes(this.state.max)}
            </>;

        return (
            <Card title="Heap" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <AreaChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]} tickFormatter={formatBytes}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Area type="monotone" dataKey="committed" name="Heap Size" stroke="#e59d44" fill="#f6debf" fillOpacity={1} strokeWidth={2} dot={false}/>
                        <Area type="monotone" dataKey="used" name="Heap Used" stroke="#50aad5" fill="#e2f5fd" fillOpacity={1} strokeWidth={2} dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default HeapWidget;
