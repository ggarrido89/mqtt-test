export class CreateAlarmDTO {
  dateTimeIni: Date;
  dateTimeTer: Date;
  description: string;
  tagId: string;
  active: boolean;
  presentValue: number;
  alarmValue: number;
  sentEmail: boolean;
  accepted: boolean;
}
