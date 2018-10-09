import React, { Component } from 'react';

class AbstractWidget extends Component {
    
    getData() {
        const data = [];
        const rawData = this.props.data;
        
        Object.keys(rawData).forEach(function(key) {
            const entry = {};
            entry.name = key;
            
            for (var i in rawData[key]) {
                entry[i] = rawData[key][i];
            }
            
            data.push(entry);
        });
        
        return data;
    }

    formatEventsPerSecond(n) {
        return parseFloat(n).toFixed(3) + " ev/s";
    }

    formatCallsPerSecond(n) {
        return parseFloat(n).toFixed(3) + " calls/s";
    }

    formatSeconds(n) {
        return parseFloat(n).toFixed(3) + " s";
    }
}

export default AbstractWidget;
