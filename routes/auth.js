module.exports = function ({ app, dbConn }) {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const sql = "SELECT * FROM user_account WHERE user_email = ? AND user_password = ?";
      dbConn.query(sql, [email, password], function (err, result) {
        if (result && result.length !== 0) {
          res.status(200).jsonp({ gender: result[0].user_gender, uid: result[0].user_cometchat_uid });
        } else {
          res.status(200).jsonp({ message: "Your username or password is not correct" });
        }
      });
    } else {
      res.status(200).jsonp({ message: "Your username or password is not correct" });
    }
  });
};