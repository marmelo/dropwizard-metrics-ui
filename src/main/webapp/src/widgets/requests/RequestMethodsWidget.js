import React, { Component } from 'react';
import Card from 'antd/lib/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getTimer, formatBytes, colors } from '../helpers';

class RequestMethodsWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const all = getTimer('io.dropwizard.jetty.MutableServletContextHandler.requests', nextProps.data).count;
        const get = getTimer('io.dropwizard.jetty.MutableServletContextHandler.get-requests', nextProps.data).count;
        const post = getTimer('io.dropwizard.jetty.MutableServletContextHandler.post-requests', nextProps.data).count;
        const put = getTimer('io.dropwizard.jetty.MutableServletContextHandler.put-requests', nextProps.data).count;
        const del = getTimer('io.dropwizard.jetty.MutableServletContextHandler.delete-requests', nextProps.data).count;

        this.setState(prevState => {
            const data = [];
            if (prevState.get >= 0) {
                data.push({
                    timestamp: new Date().getTime(),
                    get: get - prevState.get,
                    post: post - prevState.post,
                    put: put - prevState.put,
                    del: del - prevState.del,
                    other: (all - get - post - put - del) - prevState.other
                });
            }

            // new state
            return {
                get: get,
                post: post,
                put: put,
                del: del,
                other: all - get - post - put - del,
                data: prevState.data.concat(data)
            }
        });
    }

    render() {
        const extra =
            <>
                <span>GET:</span> {this.state.get}
                <span>POST:</span> {this.state.post}
                <span>PUT:</span> {this.state.put}
                <span>DELETE:</span> {this.state.del}
                <span>Other:</span> {this.state.other}
            </>;

        return (
            <Card title="Requests" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={this.state.data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="get" name="GET" stroke={colors.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="post" name="POST" stroke={colors.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="put" name="PUT" stroke={colors.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="delete" name="DELETE" stroke={colors.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="other" name="Other" stroke={colors.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default RequestMethodsWidget;
