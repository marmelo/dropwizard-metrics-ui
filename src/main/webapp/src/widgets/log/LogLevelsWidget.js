import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getMeter, colors } from '../helpers';

class LogLevelsWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const trace = getMeter('ch.qos.logback.core.Appender.trace', nextProps.data).count;
        const debug = getMeter('ch.qos.logback.core.Appender.debug', nextProps.data).count;
        const info = getMeter('ch.qos.logback.core.Appender.info', nextProps.data).count;
        const warn = getMeter('ch.qos.logback.core.Appender.warn', nextProps.data).count;
        const error = getMeter('ch.qos.logback.core.Appender.error', nextProps.data).count;

        this.setState(prevState => {
            const data = [];
            if (prevState.info >= 0) {
                data.push({
                    timestamp: new Date().getTime(),
                    trace: trace - prevState.trace,
                    debug: debug - prevState.debug,
                    info: info - prevState.info,
                    warn: warn - prevState.warn,
                    error: error - prevState.error
                });
            }

            // new state
            return {
                trace: trace,
                debug: debug,
                info: info,
                warn: warn,
                error: error,
                data: prevState.data.concat(data)
            }
        });
    }

    render() {
        const extra =
            <div className="card-extra">
                <span>Trace:</span> {this.state.trace}
                <span>Debug:</span> {this.state.debug}
                <span>Info:</span> {this.state.info}
                <span>Warn:</span> {this.state.warn}
                <span>Error:</span> {this.state.error}
            </div>;

        return (
            <Card title="Logs" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="trace" name="Trace" stroke={colors.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="debug" name="Debug" stroke={colors.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="info" name="Info" stroke={colors.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="warn" name="Warn" stroke={colors.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="error" name="Error" stroke={colors.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default LogLevelsWidget;
