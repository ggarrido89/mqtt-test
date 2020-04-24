import mqtt from "mqtt";
const websocketUrl = "ws://localhost:8080/";

function getClient() {
  const client = mqtt.connect(websocketUrl,{
      username:localStorage.getItem("ID"),
      password:localStorage.getItem("ID")
  });
  client.stream.on("error", (err) => {
    console.log(`Connection to ${websocketUrl} failed`);
    client.end();
  });
  return client;
}
function subscribe(client, topic) {
  const callBack = (err, granted) => {
    if (err) {
      console.log("Subscription request failed");
    }
  };
  return client.subscribe(topic, callBack);
}
function onMessage(client, callBack) {
  client.on("message", (topic, message, packet) => {
    callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
  });
}
function unsubscribe(client, topic) {
  client.unsubscribe(topic);
}
function closeConnection(client) {
  client.end();
}
const mqttService = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};
export default mqttService;