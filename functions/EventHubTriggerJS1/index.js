module.exports = function (context, eventHubMessages) {
 
    eventHubMessages.forEach(message => {
        context.log('Processed message: ${message}');
        context.bindings.outDoc = message;
    });

    context.done();
};

module.exports = function (context, eventHubMessage) {
 
    context.log('Received message: ${eventHubMessage}');
    context.bindings.outDoc = eventHubMessage;
    context.done();
};