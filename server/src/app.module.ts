import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MeasurementModule } from './measurement/measurement.module';
import { TagModule } from './tag/tag.module';
import { AlarmModule } from './alarm/alarm.module';
import { mongodb_conn } from './global'

@Module({
  imports: [
      MongooseModule.forRoot(mongodb_conn, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }),
      UserModule,
      MeasurementModule,
      TagModule,
      AlarmModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
