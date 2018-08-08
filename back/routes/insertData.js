import express from 'express';
import { Takamodel, Takarchive } from '../helpers/db';


const router = express.Router();
export default router;

router.post('/trashData', (req, res) => {
  const takamodel = new Takamodel(req.body);
  takamodel.save((err, result) => {
    if (err) return res.status(500).json({ message: err });
    else if (!result._id) return res.status(500).json({ message: 'An error occured during insertion' });
    Takarchive.update({ _id: result.serial_number },
      {
        _id: result.serial_number,
        $push: { logs: { $each: [result._id], $position: 0 } },
        last: result._id
      }, { upsert: true }, (error, data) => {
        res.json({ message: 'inserted' });
      });
  });
});
