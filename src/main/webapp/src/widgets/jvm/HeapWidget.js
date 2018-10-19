import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from '../AbstractWidget.js';

class HeapWidget extends AbstractWidget {
      
    constructor(props) {
        super(props);

        this.data = [];
    }
    
    render() {
        const heapInit = this.getGauge('jvm.memory.heap.init') || -1;
        const heapInitPretty = prettyBytes(heapInit);
        
        const heapUsed = this.getGauge('jvm.memory.heap.used') || -1;
        const heapUsedPretty = prettyBytes(heapUsed);
        
        const heapCommitted = this.getGauge('jvm.memory.heap.committed') || -1;
        const heapCommittedPretty = prettyBytes(heapCommitted);
        
        const heapMax = this.getGauge('jvm.memory.heap.max') || -1;
        const heapMaxPretty = prettyBytes(heapMax);
        
        const heapUsage = this.getGauge('jvm.memory.heap.usage') || -1;
        const heapUsageFixed = (heapUsage * 100.0).toFixed(1);
        const heapUsagePretty = heapUsageFixed + "%";
        
        // TODO wrong
        if (heapUsed >= 0) {
            this.data.push({
                timestamp: new Date().getTime(),
                used: heapUsed,
                committed: heapCommitted,
                max: heapMax
            });
        }
        
        // recharts require a new array instance
        const data = this.data.slice();
                
        const extra =
            <div className="card-extra">
                <span>Used:</span> {heapUsedPretty} ({heapUsagePretty})
                <span>Size:</span> {heapCommittedPretty}
                <span>Max:</span> {heapMaxPretty}
            </div>; 
        
        return (
            <Card title="Heap" type="inner" bordered={false} extra={extra}>
                <ResponsiveContainer width="100%" height={250} className="card-graph">
                    <AreaChart data={data}>
                        <XAxis type="number" dataKey="timestamp" domain={["dataMin", "dataMax"]} tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}/>
                        <YAxis type="number" domain={[0, "auto"]} tickFormatter={(bytes) => bytes >= 0 ? prettyBytes(bytes) : "N/A"}/>
                        <CartesianGrid stroke="#eee"/>
                        <Legend verticalAlign="bottom" height={36}/>
                        <Area type="monotone" dataKey="committed" name="Heap Size" stroke="#e59d44" fill="#f6debf" fillOpacity={1} strokeWidth={2}/>
                        <Area type="monotone" dataKey="used" name="Heap Used" stroke="#50aad5" fill="#e2f5fd" fillOpacity={1} strokeWidth={2}/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        );
    }
}

export default HeapWidget;
