import express from 'express';
import passport from 'passport';
import moment from 'moment';
import { Takamodel, Takarchive } from '../helpers/db';

const router = express.Router();

export default router;

router.all('/*', (req, res, next) => {
  passport.authenticate('jwt', (err, payload) => {
    if (payload.permission === 'administrateur') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  })(req, res, next);
});

router.get('/fillingRateAtDumping', (req, res) => {
  Takamodel.aggregate(
    [
      {
        $group:
          {
            _id: null,
            glass_at_dumping: { $avg: '$glass_at_dumping' },
            plastic_at_dumping: { $avg: '$plastic_at_dumping' },
            metal_at_dumping: { $avg: '$metal_at_dumping' },
          }
      }
    ], (err, docs) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ docs });
      }
    }
  );
});

router.get('/fillingRate', (req, res) => {
  Takamodel.aggregate(
    [
      {
        $group:
        {
          _id: null,
          avgFillingGlass: { $avg: '$glass_filling_rate' },
          avgFillingPlastic: { $avg: '$plastic_filling_rate' },
          avgFillingMetal: { $avg: '$metal_filling_rate' },
        }
      }
    ], (err, docs) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ docs });
      }
    }
  );
});

router.get('/serial_number', (req, res) => {
  Takamodel.distinct('serial_number', (err, serial) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ serial });
    }
  });
});


router.get('/serial_number/:id', (req, res) => {
  Takamodel.find({}, { serial_number: [req.params.id] }, (err, serialUser) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ serialUser });
    }
  });
});

router.get('/trashesList', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      _id: { $in: lastIds }
    }, (err, docs) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ docs });
      }
    });
  });
});

router.get('/yellowWarning', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      $and: [
        { _id: { $in: lastIds } },
        { $or: [
          { temp1: { $gte: 60 } },
          { temp2: { $gte: 60 } },
          { auto_default: 1 }
        ] }
      ]
    })
      .count((err, numYellow) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ numYellow });
        }
      });
  });
});

router.get('/orangeWarning', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      $and: [
        { _id: { $in: lastIds } },
        { user_default: 1 }
      ] }
    )
      .count((err, numOrange) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ numOrange });
        }
      });
  });
});

router.get('/redWarning', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      $and: [
        { _id: { $in: lastIds } },
        { auto_default: 0 },
        { user_default: 1 }
      ]
    })
      .count((err, numRed) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ numRed });
        }
      });
  });
});

router.get('/trashes/sort/professionals', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      $and: [
        { _id: { $in: lastIds } },
        { serial_number: /.*PRO$/ }
      ]
    }, (err, response) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ response });
      }
    });
  });
});

router.get('/trashes/sort/privates', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find(
      {
        $and: [
          { _id: { $in: lastIds } },
          { serial_number: /.*PAR$/ }
        ]
      }, (err, response) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ response });
        }
      });
  });
});

router.get('/trash/:id', (req, res) => {
  Takarchive.find({ _id: req.params.id }, { last: 1, _id: 0 }, (err, index) => {
    Takamodel.findOne({ _id: index[0].last }, (error, docs) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ docs });
      }
    });
  });
});

router.get('/trashes/count', (req, res) => {
  Takamodel.distinct('serial_number', (err, total) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ total: total.length });
    }
  });
});

router.get('/maintenance', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    Takamodel.find({
      $and: [
        { _id: { $in: lastIds } },
        { $or: [
          { cowl_switch1: 1 },
          { cowl_switch2: 1 },
          { drawer_switch1: 1 },
          { drawer_switch2: 1 },
          { temp1: { $gte: 60 } },
          { temp2: { $gte: 60 } },
          { overheat1: 1 },
          { overheat2: 1 },
          { user_default: 1 },
          { auto_default: 1 }
        ] }
      ]
    }, (err, data) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ data });
      }
    });
  });
});

router.get('/stats/date/:date/:action', (req, res) => {
  const date = req.params.date;
  let labels = 0;
  let twelveLastMonths = false;
  let minDate = new Date();
  let maxDate = new Date();

  if (date.match(/[0-9]{4}-W[0-9]{2}/)) {
    labels = 7;
    minDate = new Date(moment(date).isoWeekday(1));
    maxDate = new Date(moment(date).isoWeekday(8));
  } else if (date.match(/[0-9]{4}-[0-9]{2}_[0-9]{4}-[0-9]{2}/)) {
    labels = 12;
    twelveLastMonths = true;
    maxDate = new Date(moment().endOf('month').format('YYYY-MM-DD'));
    minDate = new Date(moment(maxDate).subtract(1, 'years'));
  } else if (date.match(/[0-9]{4}-[0-9]{2}/)) {
    labels = moment(date, 'YYYY-MM').daysInMonth();
    minDate = new Date(moment(`${date}-01`));
    maxDate = new Date(moment(date).add(1, 'months'));
  } else if (date.match(/[0-9]{4}/)) {
    labels = 12;
    minDate = new Date(moment(date).subtract(1, 'days'));
    maxDate = new Date(moment(date).add(1, 'years').subtract(1, 'days'));
  }

  if (req.params.action === 'newConnectedTrashes') {
    Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
      const lastIds = [];
      ids.map(id => lastIds.push(id.last));
      Takamodel.find({
        $and: [
          { _id: { $in: lastIds } },
          { realeased: { $gte: minDate, $lt: maxDate } }
        ] }, 'realeased serial_number', (err, data) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ data, labels, twelveLastMonths, date });
        }
      });
    });
  } else if (req.params.action === 'volumeTubsTrashes') {
    Takamodel.aggregate(
      [
        {
          $match: {
            last_used: {
              $gte: minDate,
              $lt: maxDate
            }
          }
        },
        { $project: {
          _id: 0,
          serial_number: 1,
          last_used: 1,
          total_glass: 1,
          total_plastic: 1,
          total_metal: 1
        }
        },
        { $sort: { serial_number: 1, last_used: 1 } },
        {
          $group: {
            _id: '$serial_number',
            first_total_glass: { $first: '$total_glass' },
            last_total_glass: { $last: '$total_glass' },
            first_total_plastic: { $first: '$total_plastic' },
            last_total_plastic: { $last: '$total_plastic' },
            first_total_metal: { $first: '$total_metal' },
            last_total_metal: { $last: '$total_metal' },
          }
        }, {
          $project: {
            _id: '$_id',
            totalGlass: { $subtract: ['$last_total_glass', '$first_total_glass'] },
            totalPlastic: { $subtract: ['$last_total_plastic', '$first_total_plastic'] },
            totalMetal: { $subtract: ['$last_total_metal', '$first_total_metal'] }
          } }, { $group: {
          _id: null,
          totalAmountGlass: { $sum: '$totalGlass' },
          totalAmountPlastic: { $sum: '$totalPlastic' },
          totalAmountMetal: { $sum: '$totalMetal' },
        } }
      ], (err, docs) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ docs });
        }
      }
    );
  }
});


router.get('/trashesOffline', (req, res) => {
  Takarchive.find({}, { _id: 0, last: 1 }, (error, ids) => {
    const lastIds = [];
    ids.map(id => lastIds.push(id.last));
    const date = `${moment().subtract(1, 'month').format('YYYY-MM-DD')}T00:00:00Z`;
    Takamodel.find({ _id: { $in: lastIds }, last_used: { $lte: new Date(date) } }, (err, data) => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ data });
      }
    });
  });
});
