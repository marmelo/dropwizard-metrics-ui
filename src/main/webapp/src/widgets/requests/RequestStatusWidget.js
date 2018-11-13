import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class RequestStatusWidget extends AbstractWidget {

    constructor(props) {
        super(props);

        this.data = [];
        
        this.requests1xx = 0;
        this.requests2xx = 0;
        this.requests3xx = 0;
        this.requests4xx = 0;
        this.requests5xx = 0;
    }
    
    render() {
        const requests1xx = this.getMeter('io.dropwizard.jetty.MutableServletContextHandler.1xx-responses') || {};
        const requests2xx = this.getMeter('io.dropwizard.jetty.MutableServletContextHandler.2xx-responses') || {};
        const requests3xx = this.getMeter('io.dropwizard.jetty.MutableServletContextHandler.3xx-responses') || {};
        const requests4xx = this.getMeter('io.dropwizard.jetty.MutableServletContextHandler.4xx-responses') || {};
        const requests5xx = this.getMeter('io.dropwizard.jetty.MutableServletContextHandler.5xx-responses') || {};
        
        const rate1xx = requests1xx.count - this.requests1xx;
        const rate2xx = requests2xx.count - this.requests2xx;
        const rate3xx = requests3xx.count - this.requests3xx;
        const rate4xx = requests4xx.count - this.requests4xx;
        const rate5xx = requests5xx.count - this.requests5xx;
        
        this.requests1xx = requests1xx.count;
        this.requests2xx = requests2xx.count;
        this.requests3xx = requests3xx.count;
        this.requests4xx = requests4xx.count;
        this.requests5xx = requests5xx.count;
        
        // TODO wrong
        if (!isNaN(rate2xx)) {
            this.data.push({
                timestamp: new Date().getTime(),
                rate1xx: rate1xx,
                rate2xx: rate2xx,
                rate3xx: rate3xx,
                rate4xx: rate4xx,
                rate5xx: rate5xx
            });
        }
        
        // recharts require a new array instance
        const data = this.data.slice();
                
        const extra =
            <div className="card-extra">
                <span>1xx:</span> {requests1xx.count}
                <span>2xx:</span> {requests2xx.count}
                <span>3xx:</span> {requests3xx.count}
                <span>4xx:</span> {requests4xx.count}
                <span>5xx:</span> {requests5xx.count}
            </div>;
        
        const color = {
            red: "#ee4035",
            orange: "#f37736",
            yellow: "#fdf498",
            green: "#7bc043",
            blue: "#0392cf"
        };
        
        return (
            <Card title="Responses" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="rate1xx" name="1xx" stroke={color.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rate2xx" name="2xx" stroke={color.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rate3xx" name="3xx" stroke={color.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rate4xx" name="4xx" stroke={color.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rate5xx" name="5xx" stroke={color.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default RequestStatusWidget;
