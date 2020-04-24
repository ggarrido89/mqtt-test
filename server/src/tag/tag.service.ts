import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDTO } from './dto/tag.dto';
import { MeasurementService } from '../measurement/measurement.service';
import { Measurement } from '../measurement/interfaces/measurement.interface';
import { AlarmService } from '../alarm/alarm.service';
import { Alarm } from '../alarm/interfaces/alarm.interface';
// import * as mongoose from 'mongoose';
import { _, orderBy } from 'lodash';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private tagModel: Model<Tag>,
    private measurementService: MeasurementService,
    private alarmService: AlarmService,
  ) {}

  // async getTagsFilterRegister(valor): Promise<Tag[]> {
  //   const tags = await this.tagModel.find({ register: Boolean(valor) });
  //   return tags;
  // }
  async getTags(): Promise<Tag[]> {
    const tags = await this.tagModel.find();
    return tags;
  }
  async getTag(id): Promise<Tag> {
    const tag = await this.tagModel.findById(id);
    return tag;
  }
  async getTagByTag(tag): Promise<Tag> {
    const res = await this.tagModel.findOne({ tag: tag });
    console.log(res);
    return res;
  }
  async getTagsByUser(userId):Promise<Tag[]>{
    const tags = await this.tagModel.find({ user: userId });
    return tags;
  }
  async createTag(createTagDTO: CreateTagDTO): Promise<Tag> {
    const newTag = new this.tagModel(createTagDTO);
    return await newTag.save();
  }
  async deleteTag(id): Promise<Tag> {
    return await this.tagModel.findByIdAndDelete(id);
  }
  async updateTag(id: string, body: CreateTagDTO): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
}
