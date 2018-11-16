import React, { Component } from 'react';
import Card from 'antd/lib/card';
import RequestStatusWidget from './requests/RequestStatusWidget'
import RequestMethodsWidget from './requests/RequestMethodsWidget'

class RequestsWidget extends Component {

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
