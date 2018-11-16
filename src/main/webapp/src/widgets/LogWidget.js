import React, { Component } from 'react';
import Card from 'antd/lib/card';
import LogLevelsWidget from './log/LogLevelsWidget'

class LogWidget extends Component {

    render() {
        return (
            <Card title="Logging" className="dwm-log">
                <Card.Grid style={{ width: '100%' }}>
                    <LogLevelsWidget data={this.props.data}/>
                </Card.Grid>
            </Card>
        );
    }
}

export default LogWidget;
