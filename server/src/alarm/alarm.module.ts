import { Module } from '@nestjs/common';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmSchema } from './schemas/alarm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Alarm', schema: AlarmSchema, collection: 'alarm' },
    ]),
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
  exports: [AlarmService],
})
export class AlarmModule {}
