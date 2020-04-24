import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';
import { MeasurementModule } from '../measurement/measurement.module';
import { MeasurementService } from '../measurement/measurement.service';
import { AlarmService } from '../alarm/alarm.service';
import { AlarmModule } from '../alarm/alarm.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MeasurementModule,
    AlarmModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'Tag', schema: TagSchema, collection: 'tag' },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
