import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import AbstractWidget from '../AbstractWidget.js';

class Meters extends AbstractWidget {
        
    render() {
        const data = this.getData();
        
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' },
            { title: 'Mean Rate', dataIndex: 'mean_rate', key: 'mean_rate', align: 'right', render: this.formatEventsPerSecond },
            { title: '1m Rate', dataIndex: 'm1_rate', key: 'm1_rate', align: 'right', render: this.formatEventsPerSecond },
            { title: '5m Rate', dataIndex: 'm5_rate', key: 'm5_rate', align: 'right', render: this.formatEventsPerSecond },
            { title: '15m Rate', dataIndex: 'm15_rate', key: 'm15_rate', align: 'right', render: this.formatEventsPerSecond }
        ];
        
        return (
            <Card title="Meters" className="dwm-core">
                <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} size="middle"/>
            </Card>
        );
    }
}

export default Meters;
