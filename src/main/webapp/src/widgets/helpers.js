import prettyMs from 'pretty-ms';
import prettyBytes from 'pretty-bytes';

export function getData(data) {
    const response = [];

    Object.keys(data).forEach(function(key) {
        const entry = {};
        entry.name = key;

        for (var i in data[key]) {
            entry[i] = data[key][i];
        }

        response.push(entry);
    });

    return response;
}

export function getGauge(name, data) {
    return (data.gauges || {})[name] || {};
}

export function getMeter(name, data) {
    return (data.meters || {})[name] || {};
}

export function getTimer(name, data) {
    return (data.timers || {})[name] || {};
}

export function formatEventsPerSecond(n) {
    return parseFloat(n).toFixed(3) + " ev/s";
}

export function formatCallsPerSecond(n) {
    return parseFloat(n).toFixed(3) + " calls/s";
}

export function formatSeconds(n) {
    return parseFloat(n).toFixed(3) + " s";
}

export function formatTime(ms) {
    return ms ? prettyMs(ms, { secDecimalDigits: 0 }) : '-';
}

export function formatBytes(bytes) {
    return bytes >= 0 ? prettyBytes(bytes, { secDecimalDigits: 0 }) : '-';
}

export const colors = {
    red: "#ee4035",
    orange: "#f37736",
    yellow: "#fdf498",
    green: "#7bc043",
    blue: "#0392cf"
};
