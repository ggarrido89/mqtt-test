import { Timestamp } from 'bson';

export class CreateTagDTO {
  tag?: string;
  name?: string;
  variable?: string;
  unity?: string;
  desc?: string;
  value?: number;
  datetime?: Date;
  min_alarm?: number;
  max_alarm?: number;
  color?: string;
  user?:string;
}
