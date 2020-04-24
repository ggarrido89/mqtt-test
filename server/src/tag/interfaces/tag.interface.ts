import { Document } from 'mongoose';

export interface Tag extends Document {
  tag: string;
  name: string;
  variable: string;
  unity: string;
  desc: string;
  value: number;
  datetime: Date;
  min_alarm: number;
  max_alarm: number;
  color: string;
}
