import { Module } from '@nestjs/common';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementSchema } from './schemas/measurement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Measurement',
        schema: MeasurementSchema,
        collection: 'measurement',
      },
    ]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}
