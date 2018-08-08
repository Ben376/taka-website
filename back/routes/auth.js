import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connection from '../helpers/sql';

const router = express.Router();

router.post('/signup', (req, res) => {
  const hush = bcrypt.hashSync(req.body.password, 10);
  const checkMail = 'SELECT email FROM users WHERE email=?;';
  const postForm = `INSERT INTO users (firstname, lastname, email, password, address_diffusion, address, zip_code, city, permission)
VALUES (?,?,?,?,?,?,?,?,? );`;
  const user = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    hush,
    req.body.diffusion,
    req.body.address,
    req.body.zip_code,
    req.body.city.toUpperCase(),
    req.body.permission
  ];
  connection.query(checkMail, [req.body.email], (err, row) => {
    if (err) {
      res.status(500).json({
        flash: 'Service temporairement indisponible'
      });
    } else if (row[0]) {
      res.status(403).json({
        flash: 'Cette adresse est déjà enregistré'
      });
    } else {
      connection.query(postForm, user, (error) => {
        if (error) {
          res.status(500).json({

            flash: 'Un élément est incorrect'
          });
        } else {
          res.status(200).json({
            flash: 'Bienvenue'
          });
        }
      });
    }
  });
});


router.post('/signin', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    const token = jwt.sign(JSON.stringify(user), 's3cr3t');
    const loggedIn = true;
    const loggedId = user.id;
    const permission = user.permission;
    return res.json({ loggedId, permission, token, message: 'You are logged in !', loggedIn });
  })(req, res);
});

export default router;
