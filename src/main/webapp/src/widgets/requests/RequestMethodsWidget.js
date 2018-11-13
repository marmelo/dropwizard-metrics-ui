import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class RequestMethodsWidget extends AbstractWidget {
      
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
        const requestGet = this.getTimer('io.dropwizard.jetty.MutableServletContextHandler.get-requests') || {};
        const requestPost = this.getTimer('io.dropwizard.jetty.MutableServletContextHandler.post-requests') || {};
        const requestPut = this.getTimer('io.dropwizard.jetty.MutableServletContextHandler.put-requests') || {};
        const requestDelete = this.getTimer('io.dropwizard.jetty.MutableServletContextHandler.delete-requests') || {};
        
        const rateGet = requestGet.count - this.requestGet;
        const ratePost = requestPost.count - this.requestPost;
        const ratePut = requestPut.count - this.requestPut;
        const rateDelete = requestDelete.count - this.requestDelete;
        
        this.requestGet = requestGet.count;
        this.requestPost = requestPost.count;
        this.requestPut = requestPut.count;
        this.requestDelete = requestDelete.count;
        
        // TODO wrong
        if (!isNaN(rateGet)) {
            this.data.push({
                timestamp: new Date().getTime(),
                rateGet: rateGet,
                ratePost: ratePost,
                ratePut: ratePut,
                rateDelete: rateDelete
            });
        }
        
        // recharts require a new array instance
        const data = this.data.slice();
                
        const extra =
            <div className="card-extra">
                <span>GET:</span> {requestGet.count}
                <span>POST:</span> {requestPost.count}
                <span>PUT:</span> {requestPut.count}
                <span>DELETE:</span> {requestDelete.count}
                <span>Other</span> {0}
            </div>;
        
        const color = {
            red: "#ee4035",
            orange: "#f37736",
            yellow: "#fdf498",
            green: "#7bc043",
            blue: "#0392cf"
        };
        
        return (
            <Card title="Requests" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="rateGet" name="GET" stroke={color.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="ratePost" name="POST" stroke={color.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="ratePut" name="PUT" stroke={color.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rateDelete" name="DELETE" stroke={color.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="monotone" dataKey="rateOther" name="Other" stroke={color.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default RequestMethodsWidget;
