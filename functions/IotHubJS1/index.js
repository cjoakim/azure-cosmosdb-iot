module.exports = function (context, IoTHubMessages) {
    // context.log(`IotHubJS1 with array: ${IoTHubMessages}`);
    // SELECT COUNT(1) FROM c where c.pk = 'device1' and c.function_loop_seq > 6;

    var seq = 0;
    IoTHubMessages.forEach(message => {
        seq = seq + 1;
        message['function_loop_seq'] = seq;
        message['pkk'] = message['device'] + seq;
        context.log(`IotHubJS1 processed message seq: ${seq}`);
        context.bindings.outDoc = message;
    });

    context.done();
};