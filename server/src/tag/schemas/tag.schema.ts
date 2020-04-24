import { Schema } from 'mongoose';

export const TagSchema = new Schema(
  {
    // name: String,
    // shortName: String,
    // unity: String,
    // nameAddress: String,
    // address: String,
    // factor: Number,
    // offset: Number,
    // lastValue: Number,
    // lastValueWrite: Number,
    // dateTimeLastValue: Date,
    // active: Boolean,
    // write: Boolean,
    // read: Boolean,
    // register: Boolean,
    // alertMax: Number,
    // alertMin: Number,
    // failMax: Number,
    // failMin: Number,
    // max: Number,
    // min: Number,
    // state: Number,
    

    tag: String,
    name: String,
    variable: String,
    unity: String,
    desc: String,
    value: Number,
    datetime: Date,
    min_alarm: Number,
    max_alarm: Number,
    color: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false },

);
