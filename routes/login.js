const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const app = express();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login')
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    //Function to check email and password
    const checkEmail = function(user_email, user_password) {
        const sqlQuery = `SELECT * FROM users WHERE email = $1;`
        const sqlValues = [user_email]
        db.query(sqlQuery, sqlValues)
        .then(data => {
          // console.log(data);
          //Compares the passwords and if the query returned the proper data
          if (data.rows.length && bcrypt.compareSync(user_password, data.rows[0].password)) {
            req.session['user_id'] = data.rows[0].id;
            req.session['user_email'] = data.rows[0].email;
            //Delete when we are complete
            console.log(data.rows[0].email + ' signed in')
            //Delete when we are complete

            const templateVars = {
              currentUser: undefined,
              userEmail: undefined
            }
            if (req.session['user_id']) {
              templateVars.currentUser = req.session['user_id'],
              templateVars.userEmail = req.session['user_email']
            }
            res.redirect('/')
          } else {
            res.send('error')
          }
        })
    }

    //Calls the checkEmail function
    checkEmail(user_email, user_password);
  });

  return router;
};
