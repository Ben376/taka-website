import express from 'express';
import bcrypt from 'bcrypt';
import mailgunJs from 'mailgun-js';
import connection from '../helpers/sql';

const router = express.Router();

const sendMail = (from, to, subject, message) => {
  const apiKey = '592dc4fd98503df252c8b5c09c7e7da6-8b7bf2f1-0677cd0d';
  const DOMAIN = 'sandbox62d84a8e1389483cac5da373a526df65.mailgun.org';
  const mailgun = mailgunJs({ apiKey, domain: DOMAIN });

  const data = {
    from,
    to,
    subject,
    text: message,
    html: `<div>${message}</div>`
  };

  mailgun.messages().send(data);
};

router.post('/addAdmin', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    connection.query('INSERT INTO users (firstname, lastname, email, password, address_diffusion, permission) VALUES (?,?,?,?,?,?);', [req.body.firstname, req.body.lastname, req.body.email, hash, 0, 'administrateur'], (error, row) => {
      if ((error) || (!row)) {
        res.status(500).json({ info: 'Echec de l\'ajout' });
      } else {
        res.status(200).json({ info: 'Nouveau collaborateur ajouté', id: row.insertedId });
      }
    });
  });
});

router.get('/userdetails/:id', (req, res) => {
  const sqlRequest = `select * from trashOwner inner join users on trashOwner.userId = users.id where serialNumber = "${req.params.id}"`;
  connection.query(sqlRequest, (err, results) => {
    res.send(results);
  });
});

router.get('/admins', (req, res) => {
  connection.query('select id, firstname, lastname, email from users where permission = "administrateur";', (err, rows) => {
    if ((err) || (!rows[0])) {
      res.json({ message: 'Request failed' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/geo', (req, res) => {
  const sqlRequest = 'SELECT DISTINCT zip_code FROM users';
  connection.query(sqlRequest, (err, results) => {
    res.json(results);
  });
});

router.get('/geo/:zip', (req, res) => {
  const sqlRequest = `SELECT serialNumber FROM trashOwner INNER JOIN users ON trashOwner.userId = users.id WHERE zip_code = ${req.params.zip}`;
  connection.query(sqlRequest, (err, results) => {
    res.json(results);
  });
});

router.get('/city', (req, res) => {
  const sqlRequest = 'SELECT DISTINCT city FROM users';
  connection.query(sqlRequest, (err, results) => {
    res.json(results);
  });
});

router.get('/city/:town', (req, res) => {
  const sqlRequest = `SELECT serialNumber FROM trashOwner INNER JOIN users ON trashOwner.userId = users.id WHERE city = "${req.params.town}"`;
  connection.query(sqlRequest, (err, results) => {
    res.json(results);
  });
});

router.get('/localisation', (req, res) => {
  const sqlRequest = 'SELECT users.address, users.zip_code FROM users INNER JOIN trashOwner on trashOwner.userId = users.id;';
  connection.query(sqlRequest, (err, results) => {
    res.json(results);
  });
});

router.post('/sendMail', (req, res) => {
  const info = `<b>${req.body.firstname} ${req.body.lastname}</b> résidant à <b>${req.body.city}</b> vous a envoyé un message : <br/><br/>`;

  sendMail(req.body.email, 'admin@taka.world', `Formulaire utilisateur : ${req.body.subject}`, info + req.body.message);
  res.end();
});


router.post('/forgetPassword', (req, res) => {
  const randomstring = Math.random().toString(36).slice(-10);
  const sqlRequest = `SELECT id, email, password FROM users WHERE email="${req.body.email}";`;
  const message = `Bonjour,<br/>Vous avez demandé à réinitialiser votre mot de passe, si vous n'êtes pas à l'origine de cette requête merci de prévenir Taka par email (contact@taka.com).<br/><br/>Voici votre nouveau mot de passe : ${randomstring}<br/><br/><br/>Merci de votre fidélité,<br/>L'équipe Taka`;

  connection.query(sqlRequest, (err, results) => {
    if (err) {
      res.status(500).json({ log: err.message });
    }

    if (results.length === 1) {
      const hash = bcrypt.hashSync(randomstring, 10);
      const updatePassword = `UPDATE users SET password='${hash}' WHERE email='${results[0].email}';`;

      connection.query(updatePassword, (error) => {
        if (error) {
          res.status(500).json({ log: 'Impossible de changer le mot de passe.' });
        }
      });

      sendMail('admin@taka.world', req.body.email, 'Réinitialisation du mot de passe.', message);
      res.status(200).json({ log: 'Vous allez recevoir un nouveau mot de passe par email !' });
    } else {
      res.status(200).json({ log: `L'adresse email ${req.body.email} n'existe pas.` });
    }
  });
});

router.put('/changeAdmin', (req, res) => {
  const updateAdmin = 'UPDATE users SET firstname= ?, lastname = ?, email= ? WHERE id = ?;';
  connection.query(updateAdmin,
    [req.body.firstname, req.body.lastname, req.body.email, req.body.id], (error) => {
      if (error) {
        res.status(500).json({ message: 'Echec de la mise à jour' });
      }
      res.status(200).json({ message: 'Votre compte a été modifié avec succès' });
    });
});

router.put('/changeAdminPassword', (req, res) => {
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

router.delete('/deleteAdmin', (req, res) => {
  connection.query('DELETE FROM users WHERE id=?;', [req.body.id], (err, row) => {
    if ((err) || (!row)) {
      res.status(500).json({ message: 'Request failed' });
    } else {
      res.status(200).json({ message: 'user deleted' });
    }
  });
});

router.delete('/deleteUserTrash/:trashId', (req, res) => {
	connection.query('DELETE FROM trashOwner WHERE serialNumber=?;', [req.params.trashId], (err, row) => {
		if ((err) || (!row)) {
			res.status(500).json({ message: 'Request failed' });
		} else {
			res.status(200).json({ message: 'trash deleted' });
		}
	});
});

export default router;
