import { Schema } from 'mongoose';
export const AlarmSchema = new Schema(
  {
    dateTimeIni: Date,
    dateTimeTer: Date,
    description: String,
    tagId: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
    active: Boolean,
    presentValue: Number,
    alarmValue: Number,
    sentEmail: Boolean,
    accepted: Boolean,
  },
  { versionKey: false },
);

