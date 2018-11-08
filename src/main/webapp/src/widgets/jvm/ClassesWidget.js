import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class ClassesWidget extends AbstractWidget {
      
    constructor(props) {
        super(props);

        this.data = [];
    }
    
    render() {
        const classesLoaded = this.getGauge('jvm.classloader.loaded');
        const classesUnloaded = this.getGauge('jvm.classloader.unloaded');
        
        // TODO wrong
        if (classesLoaded) {
            this.data.push({
                timestamp: new Date().getTime(),
                loaded: classesLoaded,
                unloaded: classesUnloaded
            });
        }
        
        // recharts require a new array instance
        const data = this.data.slice();
                
        const extra =
            <div className="card-extra">
                <span>Loaded:</span> {classesLoaded}
                <span>Unloaded:</span> {classesUnloaded}
            </div>;
        
        return (
            <Card title="Classes" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <AreaChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Area type="monotone" dataKey="loaded" name="Classes Loaded" stroke="#e59d44" fill="#f6debf" fillOpacity={1} strokeWidth={2}/>
                        <Area type="monotone" dataKey="unloaded" name="Classes Unloaded" stroke="#50aad5" fill="#e2f5fd" fillOpacity={1} strokeWidth={2}/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default ClassesWidget;
