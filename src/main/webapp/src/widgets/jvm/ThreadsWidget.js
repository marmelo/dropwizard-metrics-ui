import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class ThreadsWidget extends AbstractWidget {
      
    constructor(props) {
        super(props);

        this.data = [];
    }
    
    render() {
        const threads = this.getGauge('jvm.threads.count') || -1;
        const threadsBlocked = this.getGauge('jvm.threads.blocked.count') || -1;
        const threadsDaemon = this.getGauge('jvm.threads.daemon.count') || -1;
        const threadsRunnable = this.getGauge('jvm.threads.runnable.count') || -1;
        const threadsTimedWaiting = this.getGauge('jvm.threads.timed_waiting.count') || -1;
        const threadsWaiting = this.getGauge('jvm.threads.waiting.count') || -1;
        
        // TODO wrong
        if (threads >= 0) {
            this.data.push({
                timestamp: new Date().getTime(),
                runnable: threadsRunnable,
                daemon: threadsDaemon,
                blocked: threadsBlocked,
                timedWaiting: threadsTimedWaiting,
                waiting: threadsWaiting
            });
        }
        
        // recharts require a new array instance
        const data = this.data.slice();
                
        const extra =
            <div className="card-extra">
                <span>Live:</span> {threads}
                <span>(Runnable:</span> {threadsRunnable}
                <span>Time Waiting:</span> {threadsTimedWaiting}
                <span>Waiting:</span> {threadsWaiting})
                <span>Daemon:</span> {threadsDaemon}
            </div>; 
        
        return (
            <Card title="Threads" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="runnable" name="Runnable" stroke="#82ca9d" strokeWidth={2}/>
                        <Line type="monotone" dataKey="timedWaiting" name="Timed Waiting" stroke="#e59d44" strokeWidth={2}/>
                        <Line type="monotone" dataKey="waiting" name="Waiting" stroke="#50aad5" strokeWidth={2}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default ThreadsWidget;
