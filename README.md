# azure-cosmosdb-iot

IoT streaming pipeline with Azure IoT Hub, Stream Analytics, and CosmosDB. Node.js simulated device.

## Links

- https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-node

## Provision Azure Resources

### Provision an IoT Hub

Name: cjoakim-iot-hub
Hostname: cjoakim-iot-hub.azure-devices.net
Pricing and scale tier: S1 - Standard

### Provision Stream Analytics

### Provision CosmosDB


## Register Simulated Devices with the Azure CLI

Verify that you have a recent version of the **az CLI program**:
```
$ az --version
azure-cli (2.0.44)
...
```

Add the az extension for IoT, add two simulated devices, and get their connection-strings:
```
$ az extension add --name azure-cli-iot-ext

$ az iot hub device-identity create --hub-name cjoakim-iot-hub --device-id cjoakim-device1
$ az iot hub device-identity show-connection-string --hub-name cjoakim-iot-hub --device-id cjoakim-device1 --output json

$ az iot hub device-identity create --hub-name cjoakim-iot-hub --device-id cjoakim-device2
$ az iot hub device-identity show-connection-string --hub-name cjoakim-iot-hub --device-id cjoakim-device2 --output json
```

Visit Azure Portal, and see that the new devices are listed:


## Send Events to the IoT Hub

First, install the Node.js NPM libraries:
```
$ npm install
```

Next, send 1000 messages, pausing 250 milliseconds between messages.
```
node simulated_device.js device1 250 1000 send
```

