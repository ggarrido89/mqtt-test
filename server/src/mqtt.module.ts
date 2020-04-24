import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttController } from './mqtt.controller';
import { mongodb_conn } from './global';
import { MeasurementModule } from './measurement/measurement.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongodb_conn, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }),
    TagModule,
    MeasurementModule
  ],
  providers: [],
  controllers: [MqttController]
})
export class MqttModule {}
