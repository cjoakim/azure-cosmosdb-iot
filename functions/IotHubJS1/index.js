module.exports = function (context, IoTHubMessages) {

    var seq = 0;
    IoTHubMessages.forEach(message => {
        seq = seq + 1;
        message['function_loop_seq'] = seq;
        message['pk'] = message['device'];
        context.log(`IotHubJS1 processed message seq: ${seq}`);
        context.bindings.outDoc = message;
    });

    context.done();
};

// SELECT COUNT(1) FROM c where c.pk = 'device1'
// SELECT * FROM c where c.pk = 'device1' and c.function_loop_seq > 6;
