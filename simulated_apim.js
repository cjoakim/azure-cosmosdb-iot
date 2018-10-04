'use strict';

const fs = require("fs");
const os = require("os");
const util = require('util');
const events = require('events');
const azure  = require('azure');

//var EventHubClient = require('azure-event-hubs').Client;
const { EventHubClient } = require('@azure/event-hubs');

if (process.argv.length < 5) {
    console.log(process.argv);
    console.log('Error: too few command-line args provided.');
    console.log('  node simulated_apim.js <ms-sleep> <max-count> <send-or-test>');
    console.log('  node simulated_apim.js 1000 10 test');
    console.log('  node simulated_apim.js 1000 10 send');
    process.exit();
}

const ms_sleep  = Number(process.argv[2]);
const max_count = Number(process.argv[3]);
const send_ind  = process.argv[4];
console.log('ms_sleep:  ' + ms_sleep);
console.log('max_count: ' + max_count);
console.log('send_ind:  ' + send_ind);

const conn_str = process.env["AZURE_EVENTHUB_CONN_STRING"];
const hub_name = process.env["AZURE_EVENTHUB_HUBNAME"];
console.log('conn_str: ' + conn_str);
console.log('hub_name: ' + hub_name);

const eh_client = EventHubClient.createFromConnectionString(conn_str, hub_name);

var csv_lines = fs.readFileSync('data/pdx-marathon-2017.csv').toString().split("\n");
console.log('csv count: ' + csv_lines.length);

var msg_count = 0;
var csv_index = 0;

function randomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)) + 1);
}

async function sendMessage(msg) {
    // console.log("sending message:\n" + JSON.stringify(msg, null, 2));
    // eh_client.send(msg);

    const delivery = await eh_client.send(msg);
    console.log("message sent:\n" + JSON.stringify(msg, null, 2));
    return delivery;
}

setInterval(function() {
    msg_count = msg_count + 1;
    if (msg_count > max_count) {
        console.log('max_count reached; terminating')
        process.exit();
    }
    if (csv_index > csv_lines.length) {
        csv_index = 0;  // loop through the csv data if necessary
    }
    else {
      csv_index = csv_index + 1;
    }
    var msg = {};
    var loc = {};
    var date = new Date();
    msg['pk']  = 'app' + randomInt(10);
    msg['partitionKey']  = msg['pk'];
    msg['seq']    = msg_count;
    msg['date']   = date.toISOString();
    msg['epoch']  = date.getTime();
    msg['temperature'] = 20 + (Math.random() * 15);
    msg['humidity']    = 60 + (Math.random() * 20);

    // seq,time,lat,lng,alt_meters,dist_meters,dist_miles
    var csv_fields = csv_lines[csv_index].split('|');
    loc['type'] = 'Point';
    loc['coordinates'] = [Number(csv_fields[3]), Number(csv_fields[2])];
    msg['location']    = loc;
    msg['dist_meters'] = csv_fields[5];
    msg['alt_meters']  = csv_fields[4];

    if (send_ind === 'send') {
        var delivery = sendMessage(msg);
    }
    else {
        console.log("sample message:\n" + JSON.stringify(msg, null, 2));
    }
}, ms_sleep);


