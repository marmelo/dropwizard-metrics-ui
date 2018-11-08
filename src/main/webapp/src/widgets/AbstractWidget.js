import React, { Component } from 'react';

class AbstractWidget extends Component {
    
    getData(rawDataOverride) {
        const data = [];
        const rawData = rawDataOverride || this.props.data;
        
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
    
    getGauge(name) {
        const props = this.props || {};
        const data = props.data || {};
        const gauges = data.gauges || {};
        const gauge = gauges[name];
        return gauge ? gauge.value : null;
    }
    
    getMeter(name) {
        const props = this.props || {};
        const data = props.data || {};
        const meters = data.meters || {};
        const meter = meters[name];
        return meter;
    }
    
    getTimer(name) {
        const props = this.props || {};
        const data = props.data || {};
        const timers = data.timers || {};
        const timer = timers[name];
        return timer;
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
