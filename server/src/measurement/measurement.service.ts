import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './interfaces/measurement.interface';
import { CreateMeasurementDTO } from './dto/measurement.dto';
import * as moment from 'moment';
//import { TagService } from '../tag/tag.service';
//import { Tag } from '../tag/interfaces/tag.interface';


@Injectable()
export class MeasurementService {
  constructor(
    @InjectModel('Measurement') private measurementModel: Model<Measurement>,
    //private TagService: TagService,
  ) {}

  async getMeasurements(): Promise<Measurement[]> {
    const measurements = await this.measurementModel.find();
    return measurements;
  }

  async getMeasurementsAll(): Promise<Measurement[]> {
    const measurements = await this.measurementModel
      .find()
      .populate('tagId sensorId locationId');
    return measurements;
  }
  async getMeasurements30(): Promise<Measurement[]>{
    const before30=new Date();
    before30.setDate((new Date().getDate())-30);
    const measurements = await this.measurementModel
      .find({"dateTime": {"$gte": before30}})
    console.log(measurements);
    return measurements;
  }
  // async getMeasurementByTagfiltered(tagId, fini, ffin): Promise<Measurement[]> {

  //   const measurements = await this.measurementModel.find({
  //     tagId: tagId,
  //     dateTime: { $gte: fini, $lte: ffin },
  //   }).sort({dateTime: 1});

  // //   const measurementOrder = measurements.forEach((measurement)=>{
  // //     console.log(measurement.dateTime)
  // // })
  //   let fechahoy=new Date();

  //   //console.log(moment(fechahoy).format('YYYY/MM/dd'))
  //   return measurements;
  // }

  // async getMeasurementByTagfilteredXY(tagId, fini, ffin): Promise<any[]> {

  //   const measurements = await this.measurementModel.find({
  //     tagId: tagId,
  //     dateTime: { $gte: fini, $lte: ffin },
  //   }).sort({dateTime: 1});

  //   //  let i = 0;

  //   //  const ColorChart =["DODGERBLUE","#13B955","#F3B415","DARKBLUE","FORESTGREEN","#CD5C5C","#FC3939","#EFA31D","#009CDC","#d1bcf6","#593196"];

  //    //const tags=await this.TagService.getTagsAll();
  //     // for (let i = 0; i < measurements.length; i++) {
  //     //   let sw =0
  //     //   tags.forEach((tag)=>{
  //     //     if(tag._id==measurements[i]._id)
  //     //       this.loadDataChart(tag.shortName, APItagMediciones, ColorChart[i],TagsSelecionado[i].unity,sw);
  //     //   })
  //     // }

  //   let xy=[];


  //    measurements.map( item => {
	// 	    var fecha=new Date(item.dateTime);
  //       var zona_horaria=new Date(item.dateTime).getTimezoneOffset();
  //       zona_horaria=zona_horaria/60;
  //       fecha.setHours(fecha.getHours()+zona_horaria);

  //     xy.push({ x: fecha.getTime() , y : item.value });
  //   });

  //   return xy;
  // }

  // async getMeasurementFilteredByTagsAndDate(
  //   tags,
  //   fini,
  //   ffin,
  // ): Promise<Measurement[]> {
  //   const measurements = await this.measurementModel.find({
  //     tagId: { $in: tags },
  //     dateTime: { $gte: fini, $lte: ffin },
  //   });

  //   //console.log(tags);
  //   return measurements;
  // }

  // async getMeasurementBySensorfiltered(
  //   sensorId,
  //   fini,
  //   ffin,
  // ): Promise<Measurement[]> {
  //   const measurements = await this.measurementModel.find({
  //     sensorId: sensorId,
  //     dateTime: { $gte: fini, $lte: ffin },
  //   });
  //   return measurements;
  // }

  // async getMeasurementByLocationfiltered(
  //   locationId,
  //   fini,
  //   ffin,
  // ): Promise<Measurement[]> {
  //   const measurements = await this.measurementModel.find({
  //     locationId: locationId,
  //     dateTime: { $gte: fini, $lt: ffin },
  //   });
  //   return measurements;
  // }

  // async getMeasurement(id): Promise<Measurement> {
  //   const measurement = await this.measurementModel.findById(id);
  //   return measurement;
  // }

  // async getMeasurementsByLocationId(locationId): Promise<Measurement[]> {
  //   const measurements = await this.measurementModel.find({
  //     locationId: locationId,
  //   });
  //   return measurements;
  // }

  // async getMeasurementsBySensorId(sensorId): Promise<Measurement[]> {
  //   const measurements = await this.measurementModel.find({
  //     sensorId: sensorId,
  //   });
  //   return measurements;
  // }

  async getMeasurementsByTagId(tagId): Promise<Measurement[]> {
    const measurements = await this.measurementModel.find({
      tagId: tagId,
    });
    //console.log(measurements.dateTime);
    return measurements;
  }

  async createMeasurement(
    createMeasurementDTO: CreateMeasurementDTO,
  ): Promise<Measurement> {
    const newMeasurement = new this.measurementModel(createMeasurementDTO);
    return await newMeasurement.save();
  }

  async deleteMeasurement(id): Promise<Measurement> {
    return await this.measurementModel.findByIdAndDelete(id);
  }

  async updateMeasurement(
    id: string,
    body: CreateMeasurementDTO,
  ): Promise<Measurement> {
    return await this.measurementModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
}
