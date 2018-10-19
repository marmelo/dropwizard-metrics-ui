import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import AbstractWidget from '../AbstractWidget.js';

class Timers extends AbstractWidget {
        
    render() {
        const data = this.getData();
        
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' },
            { title: 'Mean Rate', dataIndex: 'mean_rate', key: 'mean_rate', align: 'right', render: this.formatCallsPerSecond },
            { title: '1m Rate', dataIndex: 'm1_rate', key: 'm1_rate', align: 'right', render: this.formatCallsPerSecond },
            { title: '5m Rate', dataIndex: 'm5_rate', key: 'm5_rate', align: 'right', render: this.formatCallsPerSecond },
            { title: '15m Rate', dataIndex: 'm15_rate', key: 'm15_rate', align: 'right', render: this.formatCallsPerSecond },
            { title: 'Min', dataIndex: 'min', key: 'min', align: 'right', render: this.formatSeconds },
            { title: 'Mean', dataIndex: 'mean', key: 'mean', align: 'right', render: this.formatSeconds },
            { title: 'Max', dataIndex: 'max', key: 'max', align: 'right', render: this.formatSeconds },
            { title: 'StdDev', dataIndex: 'stddev', key: 'stddev', align: 'right', render: this.formatSeconds },
            { title: 'p50', dataIndex: 'p50', key: 'p50', align: 'right', render: this.formatSeconds },
            { title: 'p75', dataIndex: 'p75', key: 'p75', align: 'right', render: this.formatSeconds },
            { title: 'p95', dataIndex: 'p95', key: 'p95', align: 'right', render: this.formatSeconds },
            { title: 'p98', dataIndex: 'p98', key: 'p98', align: 'right', render: this.formatSeconds },
            { title: 'p99', dataIndex: 'p99', key: 'p99', align: 'right', render: this.formatSeconds },
            { title: 'p999', dataIndex: 'p999', key: 'p999', align: 'right', render: this.formatSeconds }
            // { title: 'Duration Units', dataIndex: 'duration_units', key: 'duration_units' },
            // { title: 'Rate Units', dataIndex: 'rate_units', key: 'rate_units' }
        ];
        
        return (
            <Card title="Timers" className="dwm-core">
                <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} size="middle" scroll={{ x: 2000 }}/>
            </Card>
        );
    }
}

export default Timers;
