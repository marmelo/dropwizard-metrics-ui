import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import AbstractWidget from '../AbstractWidget.js';

class Histograms extends AbstractWidget {
        
    render() {
        const data = this.getData();
        
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' }
        ];
        
        return (
            <Card title="Histograms" className="dwm-core">
                <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} size="middle"/>
            </Card>
        );
    }
}

export default Histograms;
