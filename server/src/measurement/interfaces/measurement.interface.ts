import { Document } from 'mongoose';
import { getTime } from 'lodash';

export interface Measurement extends Document {
  value: number;
  dateTime: Date;
  tagId: string;
}
