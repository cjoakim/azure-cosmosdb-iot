'use strict';

const fs   = require("fs");
const os   = require("os");
const util = require('util');

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

var csv_lines = fs.readFileSync('data/pdx-marathon-2017.csv').toString().split("\n");
console.log('csv count: ' + csv_lines.length);

var msg_count = 0;
var csv_index = 0;

function randomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)) + 1);
}

setInterval(function(){
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
    var evt = {};
    var loc = {};
    var date = new Date();
    evt['pk']  = 'app' + randomInt(10);
    evt['seq']    = msg_count;
    evt['date']   = date.toISOString();
    evt['epoch']  = date.getTime();
    evt['temperature'] = 20 + (Math.random() * 15);
    evt['humidity']    = 60 + (Math.random() * 20);

    // seq,time,lat,lng,alt_meters,dist_meters,dist_miles
    var csv_fields = csv_lines[csv_index].split('|');
    loc['type'] = 'Point';
    loc['coordinates'] = [Number(csv_fields[3]), Number(csv_fields[2])];
    evt['location']    = loc;
    evt['dist_meters'] = csv_fields[5];
    evt['alt_meters']  = csv_fields[4];
    
    console.log("sample message:\n" + JSON.stringify(evt, null, 2));

}, ms_sleep);
