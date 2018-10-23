import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import AbstractWidget from './AbstractWidget.js';

import RequestStatusWidget from './requests/RequestStatusWidget.js'
import RequestMethodsWidget from './requests/RequestMethodsWidget.js'

class RequestsWidget extends AbstractWidget {
    
    render() {
        return (
            <Card title="Requests" className="dwm-requests">
                <Card.Grid style={{ width: '50%' }}>
                    <RequestMethodsWidget data={this.props.data}/>
                </Card.Grid>
                <Card.Grid style={{ width: '50%' }}>
                    <RequestStatusWidget data={this.props.data}/>
                </Card.Grid>
            </Card>
        );
    }
}

export default RequestsWidget;
