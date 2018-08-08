import mongoose from 'mongoose';

const mongoDB = 'mongodb://HOSTNAME:PORT/Taka';

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const TakaSchema = new Schema({
  realeased: Date,
  serial_number: { type: String, index: true },
  last_used: { type: Date, default: new Date() },
  bin_selected: Number,
  glass_filling_rate: Number,
  metal_after_use: Number,
  plastic_filling_rate: Number,
  plastic_after_use: Number,
  metal_filling_rate: Number,
  total_glass: Number,
  total_plastic: Number,
  total_metal: Number,
  glass_at_dumping: Number,
  plastic_at_dumping: Number,
  metal_at_dumping: Number,
  cowl_switch1: Number,
  cowl_switch2: Number,
  drawer_switch1: Number,
  drawer_switch2: Number,
  temp1: Number,
  temp2: Number,
  overheat1: Number,
  overheat2: Number,
  auto_default: Number,
  user_default: Number
}, { collection: 'Taka' });

const TrashesLogs = new Schema({
  _id: String,
  logs: Array,
  last: Object,
}, { collection: 'TrashesLogs' });

export const Takamodel = mongoose.model('Taka', TakaSchema);
export const Takarchive = mongoose.model('TrashesLogs', TrashesLogs);
