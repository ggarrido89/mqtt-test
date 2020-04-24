import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateMeasurementDTO } from './dto/measurement.dto';
import { MeasurementService } from './measurement.service';
import { AuthGuard } from 'src/shared/auth.guard';
import {_,orderBy} from 'lodash';
import { Measurement } from './interfaces/measurement.interface';

@Controller('measurement')
// //@UseGuards(new AuthGuard())
export class MeasurementController {
  constructor(private measurementService: MeasurementService) {}

  public validateIds = body => {
    Object.keys(body).map(key => {
      if (key != 'value' && key != 'dateTime' && key != 'active') {
        if (!body[key].match(/^[0-9a-fA-F]{24}$/)) {
          throw new BadRequestException(`${key} is not a valid ObjectId`);
        }
      }
    });
  };
  @Get('/30days')
  async getMeasurement30(@Res() res){
    await this.measurementService.getMeasurements30()
    .then((res)=>{
      console.log(res);
    })
    console.log()
  }
  @Post('/multiple')
  async createMeasurementMultiple(@Res() res, @Body() body) {
     //this.validateIds(body);
    let newMeasurement = {};
    body.map(async (Measurement) => { 
      // console.log(Measurement);     
      newMeasurement =  await this.measurementService.createMeasurement(Measurement);
         
    });  
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Measurement created successfully',
      data: newMeasurement,
    });
  }
  @Post()
  async createMeasurement(@Res() res, @Body() body: CreateMeasurementDTO) {
    this.validateIds(body);

    const newMeasurement = await this.measurementService.createMeasurement(
      body,
    );
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Measurement created successfully',
      data: newMeasurement,
    });
  }

  @Put('/:measurementId')
  async updateMeasurement(
    @Res() res,
    @Body() body: CreateMeasurementDTO,
    @Param('measurementId') measurementId,
  ) {
    if (!measurementId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Measurement id is not a valid ObjectId');
    }

    this.validateIds(body);

    const updatedMeasurement = await this.measurementService.updateMeasurement(
      measurementId,
      body,
    );
    if (!updatedMeasurement) {
      throw new NotFoundException('Measurement not updated');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Measurement updated',
      data: updatedMeasurement,
    });
  }

  @Delete('/:measurementId')
  async deleteMeasurement(@Res() res, @Param('measurementId') measurementId) {
    const deletedMeasurement = await this.measurementService.deleteMeasurement(
      measurementId,
    );

    if (!deletedMeasurement) {
      throw new NotFoundException('Measurement not found');
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Measurement deleted',
      data: deletedMeasurement,
    });
  }
}
