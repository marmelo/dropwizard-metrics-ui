import React from 'react';
import Progress from 'antd/lib/progress';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';

import AbstractWidget from './AbstractWidget.js';

import LogLevelsWidget from './log/LogLevelsWidget.js'

class LogWidget extends AbstractWidget {
    
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
