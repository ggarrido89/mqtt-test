import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MqttModule } from './mqtt.module';
import { mqtt_con, app_port } from './global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(app_port);

  const mqtt = await NestFactory.createMicroservice(MqttModule, {
    transport: Transport.MQTT,
    options: {
      url: mqtt_con,
      username: 'idealcontrol',
      password: 'idealcontrol281',
      // ca: ca,
      // cert: chain,
      // key: key,
    }
  });
  await mqtt
    .listenAsync()
    .then(() => {
      console.log(`Conectado a ${mqtt_con} exitosamente!!`);
    })
    .catch(err => {
      console.log('ERROR!');
      console.error(err);
    });
}
bootstrap();
