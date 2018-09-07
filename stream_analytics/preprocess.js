function main(data) {
    var event_object = {};
    event_object['pk'] = 'unknown';

    try {
        event_object = JSON.parse(JSON.stringify(data));
        event_object['pk'] = 'unknown';
        if (event_object['device']) {
            event_object['pk'] = event_object['device'];
        }
    }
    catch(e) {
        result_object['error'] = e;
    }
    return event_object;
}

// There was a problem formatting the document as per CosmosDB constraints 
// for db:[dev], and collection:[iot]. Please check Diagnostics Log 
// for detailed error message.
