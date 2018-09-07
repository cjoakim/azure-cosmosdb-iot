// If the JSON event object contains the attribute named 'device',
// then use that value to populate the 'pk' (i.e. - partition key)
// attribute and return the augmented event object.
// Give this UDF the name 'add_pk' in Azure Portal.
// See https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-stream-analytics-query-patterns
// Chris Joakim, Microsoft, 2018/09/06

function main(input) {
    var event_object = JSON.stringify(input);
    event_object['pk'] = 'unknown';

    if (event_object['device']) {
        event_object['pk'] = event_object['device'];
    }

    return JSON.stringify(event_object);
}

function main(event_object) {
    event_object['pk'] = 'unknown';
    if (event_object['device']) {
        event_object['pk'] = event_object['device'];
    }
    return event_object;
}

function main(x) {
    return JSON.stringify(x);
}

function main(x) {
    return x;
}


function main(data) {
    var result_object = {};

    try {
        result_object['data'] = data;
    }
    catch(e) {
        result_object['error'] = e;
    }
    return result_object;
}

