import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class LogLevelsWidget extends AbstractWidget {
      
    constructor(props) {
        super(props);

        this.data = [];
        
        this.all = 0;
        this.trace = 0;
        this.debug = 0;
        this.info = 0;
        this.warn = 0;
        this.error = 0;
    }
    
    render() {
        const levelAll = this.getMeter('ch.qos.logback.core.Appender.all') || {};
        const levelTrace = this.getMeter('ch.qos.logback.core.Appender.trace') || {};
        const levelDebug = this.getMeter('ch.qos.logback.core.Appender.debug') || {};
        const levelInfo = this.getMeter('ch.qos.logback.core.Appender.info') || {};
        const levelWarn = this.getMeter('ch.qos.logback.core.Appender.warn') || {};
        const levelError = this.getMeter('ch.qos.logback.core.Appender.error') || {};
        
        const rateAll = levelAll.count - this.all;
        const rateTrace = levelTrace.count - this.trace;
        const rateDebug = levelDebug.count - this.debug;
        const rateInfo = levelInfo.count - this.info;
        const rateWarn = levelWarn.count - this.warn;
        const rateError = levelError.count - this.error;
        
        this.all = levelAll.count;
        this.trace = levelTrace.count;
        this.debug = levelDebug.count;
        this.info = levelInfo.count;
        this.warn = levelWarn.count;
        this.error = levelError.count;
        
        // TODO wrong
        if (true) {
            this.data.push({
                timestamp: new Date().getTime(),
                rateTrace: rateTrace,
                rateDebug: rateDebug,
                rateInfo: rateInfo,
                rateWarn: rateWarn,
                rateError: rateError
            });
        }
        
        // recharts require a new array instance
        const start = new Date().getTime() - 60000;
        const data = this.data.filter(entry => entry.timestamp >= start);
                
        const extra =
            <div className="card-extra">
                <span>Total:</span> {levelAll.count}
                <span>Trace:</span> {levelTrace.count}
                <span>Debug:</span> {levelDebug.count}
                <span>Info:</span> {levelInfo.count}
                <span>Warn:</span> {levelWarn.count}
                <span>Error:</span> {levelError.count}
            </div>;
        
        const color = {
            red: "#ee4035",
            orange: "#f37736",
            yellow: "#fdf498",
            green: "#7bc043",
            blue: "#0392cf"
        };
        
        return (
            <Card title="Logs" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <LineChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="step" dataKey="rateTrace" name="Trace" stroke={color.yellow} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="step" dataKey="rateDebug" name="Debug" stroke={color.blue} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="step" dataKey="rateInfo" name="Info" stroke={color.green} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="step" dataKey="rateWarn" name="Warn" stroke={color.orange} strokeWidth={2} dot={false} isAnimationActive={false}/>
                        <Line type="step" dataKey="rateError" name="Error" stroke={color.red} strokeWidth={2} dot={false} isAnimationActive={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default LogLevelsWidget;
