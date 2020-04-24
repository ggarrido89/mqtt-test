import { Schema } from 'mongoose';

export const MeasurementSchema = new Schema(
  {
    value: Number,
    dateTime: Date,
    tagId: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    }
  },
  { versionKey: false },
);
