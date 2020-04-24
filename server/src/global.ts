import * as fs from 'fs';

// GENERAL
export const app_port = 3000

// SERVER
const host = 'localhost';

// MQTT
const mqtt_port = 1883;
const mqtt_protocol = 'mqtt';
export const mqtt_con = `${mqtt_protocol}://${host}:${mqtt_port}`;


// MONGO
const mongo_user = '';
const mongo_pass = '';
const mongo_db = 'mqtt-test';
const mongo_port = 27017;
// export const mongodb_conn=`mongodb://${mongo_user}:${mongo_pass}@${host}:27017/${mongo_db}?authSource=admin`
export const mongodb_conn = `mongodb://${host}:${mongo_port}/${mongo_db}`;