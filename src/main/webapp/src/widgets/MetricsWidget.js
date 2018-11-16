import React, { Component } from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Badge from 'antd/lib/badge';
import Tag from 'antd/lib/tag';
import { getData, formatEventsPerSecond, formatCallsPerSecond, formatSeconds } from './helpers';

class MetricsWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: "gauges"
        };

        this.gaugesColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Value', dataIndex: 'value', key: 'value', align: 'right' }
        ];

        this.countersColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' }
        ];

        this.histogramsColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' }
        ];

        this.metersColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' },
            { title: 'Mean Rate', dataIndex: 'mean_rate', key: 'mean_rate', align: 'right', render: formatEventsPerSecond },
            { title: '1m Rate', dataIndex: 'm1_rate', key: 'm1_rate', align: 'right', render: formatEventsPerSecond },
            { title: '5m Rate', dataIndex: 'm5_rate', key: 'm5_rate', align: 'right', render: formatEventsPerSecond },
            { title: '15m Rate', dataIndex: 'm15_rate', key: 'm15_rate', align: 'right', render: formatEventsPerSecond }
        ];

        this.timersColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' },
            { title: 'Mean Rate', dataIndex: 'mean_rate', key: 'mean_rate', align: 'right', render: formatCallsPerSecond },
            { title: '1m Rate', dataIndex: 'm1_rate', key: 'm1_rate', align: 'right', render: formatCallsPerSecond },
            { title: '5m Rate', dataIndex: 'm5_rate', key: 'm5_rate', align: 'right', render: formatCallsPerSecond },
            { title: '15m Rate', dataIndex: 'm15_rate', key: 'm15_rate', align: 'right', render: formatCallsPerSecond },
            { title: 'Min', dataIndex: 'min', key: 'min', align: 'right', render: formatSeconds },
            { title: 'Mean', dataIndex: 'mean', key: 'mean', align: 'right', render: formatSeconds },
            { title: 'Max', dataIndex: 'max', key: 'max', align: 'right', render: formatSeconds },
            { title: 'StdDev', dataIndex: 'stddev', key: 'stddev', align: 'right', render: formatSeconds },
            { title: 'p50', dataIndex: 'p50', key: 'p50', align: 'right', render: formatSeconds },
            { title: 'p75', dataIndex: 'p75', key: 'p75', align: 'right', render: formatSeconds },
            { title: 'p95', dataIndex: 'p95', key: 'p95', align: 'right', render: formatSeconds },
            { title: 'p98', dataIndex: 'p98', key: 'p98', align: 'right', render: formatSeconds },
            { title: 'p99', dataIndex: 'p99', key: 'p99', align: 'right', render: formatSeconds },
            { title: 'p999', dataIndex: 'p999', key: 'p999', align: 'right', render: formatSeconds }
        ];
    }

    render() {
        const gauges = getData(this.props.data.gauges);
        const counters = getData(this.props.data.counters);
        const histograms = getData(this.props.data.histograms);
        const meters = getData(this.props.data.meters);
        const timers = getData(this.props.data.timers);

        const tabList = [
            { key: 'gauges', tab: <>Gauges <Tag>{gauges.length}</Tag></> },
            { key: 'counters', tab: <>Counters <Tag>{counters.length}</Tag></> },
            { key: 'histograms', tab: <>Histograms <Tag>{histograms.length}</Tag></> },
            { key: 'meters', tab: <>Meters <Tag>{meters.length}</Tag></> },
            { key: 'timers', tab: <>Timers <Tag>{timers.length}</Tag></> }
        ];

        const contentList = {
            gauges: <Table dataSource={gauges} columns={this.gaugesColumns} pagination={{ pageSize: 5 }} size="middle"/>,
            counters: <Table dataSource={counters} columns={this.countersColumns} pagination={{ pageSize: 5 }} size="middle"/>,
            histograms: <Table dataSource={histograms} columns={this.histogramsColumns} pagination={{ pageSize: 5 }} size="middle"/>,
            meters: <Table dataSource={meters} columns={this.metersColumns} pagination={{ pageSize: 5 }} size="middle"/>,
            timers: <Table dataSource={timers} columns={this.timersColumns} pagination={{ pageSize: 5 }} size="middle" scroll={{ x: 2000 }}/>
        };

        return (
            <Card tabList={tabList} activeTabKey={this.state.key} onTabChange={(key) => { this.onTabChange(key, 'key'); }} className="dwm-core">
                { contentList[this.state.key] }
            </Card>
        );
    }

    onTabChange(key, type) {
        this.setState({ [type]: key });
    }
}

export default MetricsWidget;
