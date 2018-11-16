import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getGauge, formatBytes } from '../helpers';

class ClassesWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const loaded = getGauge('jvm.classloader.loaded', nextProps.data).value;
        const unloaded = getGauge('jvm.classloader.unloaded', nextProps.data).value;

        const data = [];
        if (loaded >= 0) {
            data.push({
                timestamp: new Date().getTime(),
                loaded: loaded,
                unloaded: unloaded
            });
        }

        this.setState(prevState => ({
            loaded: loaded,
            unloaded: unloaded,
            data: prevState.data.concat(data)
        }));
    }

    render() {
        const extra =
            <div className="card-extra">
                <span>Loaded:</span> {this.state.loaded}
                <span>Unloaded:</span> {this.state.unloaded}
            </div>;

        return (
            <Card title="Classes" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <AreaChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Area type="monotone" dataKey="loaded" name="Classes Loaded" stroke="#e59d44" fill="#f6debf" fillOpacity={1} strokeWidth={2} dot={false}/>
                        <Area type="monotone" dataKey="unloaded" name="Classes Unloaded" stroke="#50aad5" fill="#e2f5fd" fillOpacity={1} strokeWidth={2} dot={false}/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default ClassesWidget;
