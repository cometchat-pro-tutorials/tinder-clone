module.exports = function ({ app, dbConn, constants }) {
  app.post("/requests/create", (req, res) => {
    const { matchRequestFrom, matchRequestTo, matchRequestSender, matchRequestReceiver } = req.body;
    if (matchRequestFrom && matchRequestTo && matchRequestSender && matchRequestReceiver) {
      // check the request existed in the database or not.
      const sql = "SELECT * FROM match_request WHERE match_request_from = ? AND match_request_to = ?";
      dbConn.query(sql, [matchRequestFrom, matchRequestTo], function (err, result) {
        if (err) {
          res.status(200).jsonp({ message: "The system error. Please try again" });
        } else if (result && result.length !== 0) {
          res.status(200).jsonp({ message: "The match request existed in the system." });
        } else {
          const findMatchRequestSql = "SELECT * FROM match_request WHERE match_request_from = ? AND match_request_to = ?";
          dbConn.query(findMatchRequestSql, [matchRequestTo, matchRequestFrom], function (err, matchRequests) {
            if (err) {
              res.status(200).jsonp({ message: "The system error. Please try again" });
            } else if (matchRequests && matchRequests.length !== 0) {
              // update the match request.
              const updateMatchRequestSql = "UPDATE match_request SET match_request_status = ?, accepted_date = ? WHERE id = ?";
              dbConn.query(updateMatchRequestSql, [constants.matchRequestStatus.accepted, new Date(), matchRequests[0].id], function (err, updatedResults) {
                if (err) {
                  res.status(200).jsonp({ message: "The system error. Please try again" });
                } else if (updatedResults) {
                  res.status(200).jsonp({ match_request_status: constants.matchRequestStatus.accepted});
                }
              });
            } else {
              // insert the new request.
              const status = constants.matchRequestStatus.pending;
              const request = [[matchRequestFrom, matchRequestTo, matchRequestSender, matchRequestReceiver, status]];
              const insertSql = "INSERT INTO match_request (match_request_from, match_request_to, match_request_sender, match_request_receiver, match_request_status) VALUES ?";
              dbConn.query(insertSql, [request], function (err, result) {
                if (err) {
                  res.status(200).jsonp({ message: "Cannot create your match request, please try again" });
                } else {
                  res.status(200).jsonp({ message: "The match request has been created successfully" });
                }
              });
            }
          });
        }
      });
    } else {
      res.status(200).jsonp({ message: 'Please provide the match request from and the match request to' });
    }
  });
};
