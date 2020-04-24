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
import { AlarmService } from './alarm.service';
import { CreateAlarmDTO } from './dto/alarm.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('alarm')
//@UseGuards(new AuthGuard())
export class AlarmController {
  constructor(private alarmService: AlarmService) {}

  @Post()
  async createAlarm(@Res() res, @Body() body: CreateAlarmDTO) {
    const newAlarm = await this.alarmService.createAlarm(body);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Alarm created successfully',
      data: newAlarm,
    });
  }


  @Get()
  async getAlarms(@Res() res) {
    const alarms = await this.alarmService.getAlarms();

    let msg = alarms.length == 0 ? 'Alarms not found' : 'Alarms fetched';

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: msg,
      data: alarms,
      count: alarms.length,
    });
  }
  @Get('/:fini/:ffin')
  async getAlarmByfilteredDate(
    @Res() res,   
    @Param('fini') fini,
    @Param('ffin') ffin,
  ) {  
    const alarms = await this.alarmService.getAlarmByfilteredDate(     
      fini,
      ffin,
    );
    let msg =
    alarms.length == 0
        ? 'alarms not found'
        : 'alarms fetched';

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: msg,
      data: alarms,
      count: alarms.length,
    });
  }

  @Get('/all')
  async getAlarmsAll(@Res() res) {
    const alarms = await this.alarmService.getAlarmsAll();

    let msg = alarms.length == 0 ? 'Alarms not found' : 'Alarms fetched';

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: msg,
      data: alarms,
      count: alarms.length,
    });
  }

  @Get('/:alarmId')
  async getAlarm(
    @Res() res, 
    @Param('alarmId') alarmId
    ) {
    if (!alarmId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Alarm id is not a valid  ObjectId');
    }

    const alarm = await this.alarmService.getAlarm(alarmId);
    if (!alarm) {
      throw new NotFoundException('Alarm not found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Alarm found',
      data: alarm,
    });
  }

  @Put('/:alarmId')
  async updateAlarm(
    @Res() res,
    @Body() body: CreateAlarmDTO,
    @Param('alarmId') alarmId,
  ) {
    if (!alarmId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Alarm id is not a valid  ObjectId');
    }
    const updatedAlarm = await this.alarmService.updateAlarm(alarmId, body);
    if (!updatedAlarm) {
      throw new NotFoundException('Alarm not updated');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Alarm updated',
      data: updatedAlarm,
    });
  }

  @Delete('/:alarmId')
  async deleteAlarm(@Res() res, @Param('alarmId') alarmId) {
    const deletedAlarm = await this.alarmService.deleteAlarm(alarmId);

    if (!deletedAlarm) {
      throw new NotFoundException('Alarm not found');
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Alarm deleted',
      data: deletedAlarm,
    });
  }
}
