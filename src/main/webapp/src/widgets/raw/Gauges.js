import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import AbstractWidget from '../AbstractWidget.js';

class Gauges extends AbstractWidget {
        
    render() {
        const data = this.getData();
        
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Value', dataIndex: 'value', key: 'value', align: 'right' }
        ];
        
        return (
            <Card title="Gauges">
                <Table dataSource={data} columns={columns} size="middle"/>
            </Card>
        );
    }
}

export default Gauges;
