import express from 'express';
import bcrypt from 'bcrypt';
import connection from '../helpers/sql';
import { Takamodel, Takarchive } from '../helpers/db';

const router = express.Router();

router.post('/createTrash', (req, res) => {
  connection.query('SELECT id FROM trashOwner WHERE serialNumber=?', [req.body.serialNumber.toUpperCase()], (err, rows) => {
    if ((err) || (!rows[0])) {
      connection.query('INSERT INTO trashOwner (serialNumber, userId) VALUES (?,?);', [req.body.serialNumber.toUpperCase(), req.body.userId], (error, row) => {
        if ((error) || (!row)) {
          res.status(500).json({ info: 'Echec de l\'insertion' });
        }
        res.status(200).json({ info: 'Nouvelle poubelle ajouté' });
      });
    } else {
      res.status(403).json({ info: 'Ce numéro de série est déjà enregistré' });
    }
  });
});

router.get('/read/:id', (req, res) => {
  try {
    connection.query('SELECT firstname, lastname, email, address_diffusion, createdAt, address, zip_code, city, permission FROM users WHERE id =?;', [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ info: 'Error retriving user informations' });
      } else if (!row.length) {
        res.status(500).json({ info: 'Not found' });
      } else if (row) {
        res.status(200).json({ user: row[0] });
      } else {
        res.status(500).json({ info: 'No user found' });
      }
    });
  } catch (err) {
    throw ('An error occured during reading the id: ', err);
  }
});

router.get('/readSN/:id', (req, res) => {
  try {
    connection.query('SELECT serialNumber FROM trashOwner WHERE userId =?;', [req.params.id], (err, rows) => {
      if (err || !rows[0]) {
        res.status(500).json({ info: 'Error retriving user informations' });
      } else if (rows) {
        res.status(200).json({ data: rows });
      } else {
        res.status(500).json({ info: `An error occured retriving the serial number ${req.params.Id}` });
      }
    });
  } catch (err) {
    throw ('An error occured during reading serial number: ', err);
  }
});

router.get('/serial_number/:sn', (req, res) => {
  Takarchive.find({ _id: req.params.sn }, { _id: 0, last: 1 }, (error, serialNb) => {
    if (error) res.json({ message: error });
    else if (!serialNb.length) res.status(500).json({ message: `Serial Number ${req.params.sn} not found` });
    else if (serialNb.length) {
      Takamodel.find({ _id: serialNb[0].last },
        {
          _id: 0,
          serial_number: 1,
          total_glass: 1,
          total_plastic: 1,
          total_metal: 1,
          glass_filling_rate: 1,
          metal_filling_rate: 1,
          plastic_filling_rate: 1,
          glass_at_dumping: 1,
          metal_at_dumping: 1,
          plastic_at_dumping: 1
        },
        (err, serial) => {
          if (err) {
            res.json({ message: err });
          } else if (serial.length) {
            res.json({ serial });
          } else {
            res.json({ message: `No infos found for the serial number ${req.params.sn}` });
          }
        });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  });
});

router.get('/serial_numberList/:snList', (req, res) => {
  Takarchive.find({ _id: { $in: [req.params.snList] } }, { _id: 0, last: 1 }, (error, serialNb) => {
    if (error) res.json({ message: error });
    else if (!serialNb.length) res.status(500).json({ message: `Serial Number ${req.params.sn} not found` });
    else if (serialNb.length) {
      Takamodel.find({ _id: { $in: [serialNb.last] } },
        {
          _id: 0,
          serial_number: 1,
          total_glass: 1,
          total_plastic: 1,
          total_metal: 1,
          glass_filling_rate: 1,
          metal_filling_rate: 1,
          plastic_filling_rate: 1,
          glass_at_dumping: 1,
          metal_at_dumping: 1,
          plastic_at_dumping: 1
        },
        (err, serial) => {
          if (err) {
            res.json({ message: err });
          } else if (serial.length) {
            res.json({ serial });
          } else {
            res.json({ message: `No infos found for the serial number ${req.params.sn}` });
          }
        });
    } else {
      res.status(500).json({ message: 'An error occured' });
    }
  });
});

router.get('/serialNumberHistory/:sn', (req, res) => {
  Takarchive.find({ _id: req.params.sn }, { logs: 1 }, (err, datas) => {
    Takamodel.find({ _id: { $in: datas[0].logs } }, (error, history) => {
      if (error) res.status(500).json({ message: 'an error occured' });
      if (!history.length) {
        res.status(500).json({ message: 'no datas returned' });
      } else {
        res.json(history);
      }
    });
  });
});

router.post('/checkPassword', (req, res) => {
  connection.query('SELECT password FROM users WHERE id = ?', [req.body.id], (err, result) => {
    if (result) {
      const isSame = bcrypt.compareSync(req.body.password, result[0].password);
      if (isSame !== true) {
        res.status(401).json({ message: 'Incorrect password.' });
      } else {
        res.status(200).json({ message: 'mot de passe vérifié' });
      }
    } else {
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
});

router.put('/changePassword', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const updatePassword = 'UPDATE users SET password = ? WHERE id = ?;';
    connection.query(updatePassword, [hash, req.body.id], (error) => {
      if (error) {
        res.status(500).json({ message: 'Echec de la mise à jour' });
      }
      res.status(200).json({ message: 'Votre mot de passe a été modifié avec succès' });
    });
  });
});

router.put('/update', (req, res) => {
  const user = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.address_diffusion,
    req.body.createdAt,
    req.body.address,
    req.body.zip_code,
    req.body.city,
    req.body.permission,
    req.body.id
  ];
  const updateForm = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, address_diffusion = ?, createdAt = ?, address = ?, zip_code = ?, city = ?, permission = ? WHERE id = ?;';
  connection.query(updateForm, user, (error) => {
    if (error) {
      res.status(500).json({ info: 'Erreur de mise à jour' });
    }
    res.status(200).json({ info: 'Votre compte a été modifié avec succès' });
  });
});

router.delete('/deleteTrash', (req, res) => {
  connection.query('DELETE from trashOwner WHERE serialNumber=? AND userid=?;', [req.body.serialNumber, req.body.id], (err, row) => {
    if ((err) || (!row)) { res.status(500).json(err); }
    res.status(200).json({ info: 'trash deleted' });
  });
});

router.delete('/delete', (req, res) => {
  connection.query('DELETE FROM users WHERE id=?;', [req.body.id], (err, row) => {
    if ((err) || (!row)) { res.status(500).json(err); }
    res.status(200).json({ info: 'user deleted' });
  });
});

export default router;
