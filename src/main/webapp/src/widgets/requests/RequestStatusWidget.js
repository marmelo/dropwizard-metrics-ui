import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getMeter, colors } from '../helpers';

class RequestStatusWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const reqs1xx = getMeter('io.dropwizard.jetty.MutableServletContextHandler.1xx-responses', nextProps.data).count;
        const reqs2xx = getMeter('io.dropwizard.jetty.MutableServletContextHandler.2xx-responses', nextProps.data).count;
        const reqs3xx = getMeter('io.dropwizard.jetty.MutableServletContextHandler.3xx-responses', nextProps.data).count;
        const reqs4xx = getMeter('io.dropwizard.jetty.MutableServletContextHandler.4xx-responses', nextProps.data).count;
        const reqs5xx = getMeter('io.dropwizard.jetty.MutableServletContextHandler.5xx-responses', nextProps.data).count;

        this.setState(prevState => {
            const data = [];
            if (prevState.reqs2xx >= 0) {
                data.push({
                    timestamp: new Date().getTime(),
                    reqs1xx: reqs1xx - prevState.reqs1xx,
                    reqs2xx: reqs2xx - prevState.reqs2xx,
                    reqs3xx: reqs3xx - prevState.reqs3xx,
                    reqs4xx: reqs4xx - prevState.reqs4xx,
                    reqs5xx: reqs5xx - prevState.reqs5xx
                });
            }

            // new state
            return {
                reqs1xx: reqs1xx,
                reqs2xx: reqs2xx,
                reqs3xx: reqs3xx,
                reqs4xx: reqs4xx,
                reqs5xx: reqs5xx,
                data: prevState.data.concat(data)
            }
        });
    }

    render() {
        const extra =
            <div className="card-extra">
                <span>1xx:</span> {this.state.reqs1xx}
                <span>2xx:</span> {this.state.reqs2xx}
                <span>3xx:</span> {this.state.reqs3xx}
                <span>4xx:</span> {this.state.reqs4xx}
                <span>5xx:</span> {this.state.reqs5xx}
            </div>;

        return (
            <Card title="Responses" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="reqs1xx" name="1xx" stroke={colors.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="reqs2xx" name="2xx" stroke={colors.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="reqs3xx" name="3xx" stroke={colors.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="reqs4xx" name="4xx" stroke={colors.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="reqs5xx" name="5xx" stroke={colors.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default RequestStatusWidget;
