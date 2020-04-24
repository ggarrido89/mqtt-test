import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAlarmDTO } from './dto/alarm.dto';
import { Alarm } from './interfaces/alarm.interface';


@Injectable()
export class AlarmService {
  constructor(@InjectModel('Alarm') private alarmModel: Model<Alarm>) {}

  async getAlarms(): Promise<Alarm[]> {
    const alarms = await this.alarmModel.find();
    return alarms;
  }

  async getAlarmsAll(): Promise<Alarm[]> {
    const alarms = await this.alarmModel.find().populate('tagId');
    return alarms;
  }

  async getAlarmsByTagId(tagId): Promise<Alarm[]> {
    const alarms = await this.alarmModel.find({ tagId: tagId });
    return alarms;
  }

  async getAlarm(id): Promise<Alarm> {
    const alarm = await this.alarmModel.findById(id);
    return alarm;
  }

  async createAlarm(createAlarmDTO: CreateAlarmDTO): Promise<Alarm> {
    const newAlarm = new this.alarmModel(createAlarmDTO);
    return await newAlarm.save();
  }

  async deleteAlarm(id): Promise<Alarm> {
    return await this.alarmModel.findByIdAndDelete(id);
  }

  async updateAlarm(id: string, body: CreateAlarmDTO): Promise<Alarm> {
    return await this.alarmModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async getAlarmByfilteredDate(   
    fini,
    ffin,
  ): Promise<Alarm[]> {
    const alarms = await this.alarmModel.find({      
      dateTimeIni: { $gte: fini, $lte: ffin },
    });
    return alarms;
  }
}
