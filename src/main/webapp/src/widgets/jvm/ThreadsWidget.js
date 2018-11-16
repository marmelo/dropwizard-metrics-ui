import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getGauge, formatBytes, colors } from '../helpers';

class ThreadsWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const all = getGauge('jvm.threads.count', nextProps.data).value;
        const blocked = getGauge('jvm.threads.blocked.count', nextProps.data).value;
        const daemon = getGauge('jvm.threads.daemon.count', nextProps.data).value;
        const runnable = getGauge('jvm.threads.runnable.count', nextProps.data).value;
        const timedWaiting = getGauge('jvm.threads.timed_waiting.count', nextProps.data).value;
        const waiting = getGauge('jvm.threads.waiting.count', nextProps.data).value;

        const data = [];
        if (all >= 0) {
            data.push({
                timestamp: new Date().getTime(),
                all: all,
                blocked: blocked,
                daemon: daemon,
                runnable: runnable,
                timedWaiting: timedWaiting,
                waiting: waiting
            });
        }

        this.setState(prevState => ({
            all: all,
            blocked: blocked,
            daemon: daemon,
            runnable: runnable,
            timedWaiting: timedWaiting,
            waiting: waiting,
            data: prevState.data.concat(data)
        }));
    }

    render() {
        const extra =
            <div className="card-extra">
                <span>Live:</span> {this.state.all}
                <span>(Runnable:</span> {this.state.runnable}
                <span>Time Waiting:</span> {this.state.timedWaiting}
                <span>Waiting:</span> {this.state.waiting}
                <span>Blocked:</span> {this.state.blocked})
                <span>Daemon:</span> {this.state.daemon}
            </div>;

        return (
            <Card title="Threads" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="runnable" name="Runnable" stroke={colors.green} strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey="timedWaiting" name="Timed Waiting" stroke={colors.yellow} strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey="waiting" name="Waiting" stroke={colors.orange} strokeWidth={2} dot={false}/>
                        <Line type="monotone" dataKey="blocked" name="Blocked" stroke={colors.red} strokeWidth={2} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default ThreadsWidget;
