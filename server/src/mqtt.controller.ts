import { Controller } from '@nestjs/common';
import {
  Payload,
  Ctx,
  MqttContext,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { MeasurementService } from './measurement/measurement.service';
import { TagService } from './tag/tag.service';
// import { CreateRegDTO } from 'src/reg/dto/reg.dto';

@Controller()
export class MqttController {
  constructor(
    private measurementService: MeasurementService,
    private tagService: TagService,
  ) {}

  @EventPattern('#')
  async getValue(@Ctx() context: MqttContext) {
    const data: any = context.getPacket();
    const topic: string[] = data.topic.split('/');
    const value: number = parseFloat(data.payload.toString());
    await this.tagService
      .getTagByTag(topic[topic.length - 1])
      .then((data: any) => {
        const id = data._id;
        const dateTime = new Date();
        this.measurementService.createMeasurement({
          tagId: id,
          value: value,
          dateTime: dateTime,
        });
        this.tagService.updateTag(id, { value: value, datetime: dateTime });
      });
  }
}
