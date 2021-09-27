module.exports = function ({ app, dbConn, constants }) {
  app.post("/requests/get", (req, res) => {
    const { ccUid } = req.body;
    const sql = "SELECT * FROM match_request WHERE match_request_from = ? || match_request_to = ?";
    dbConn.query(sql, [ccUid, ccUid], function (err, result) {
      if (err) {
        res.status(200).jsonp({ message: 'Cannot get the list of match requests' });
      } else {
        res.status(200).jsonp(result);
      }
    });
  });

  app.post("/requests/create", (req, res) => {
    const { matchRequestFrom, matchRequestTo, matchRequestSender, matchRequestReceiver } = req.body;
    if (matchRequestFrom && matchRequestTo && matchRequestSender && matchRequestReceiver) {
      // check the request existed in the database or not.
      const sql = "SELECT * FROM match_request WHERE (match_request_from = ? AND match_request_to = ?) OR (match_request_from = ? AND match_request_to = ?)";
      dbConn.query(sql, [matchRequestFrom, matchRequestTo, matchRequestTo, matchRequestFrom], function (err, result) {
        if (err) {
          res.status(200).jsonp({ message: "The system error. Please try again" });
        } else if (result && result.length !== 0) {
          res.status(200).jsonp({ message: "The match request existed in the system. Please check your list of requests" });
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
    } else {
      res.status(200).jsonp({ message: 'Please provide the match request from and the match request to' });
    }
  });

  const getUpdateRequest = (id, status) => {
    if (status && status === constants.matchRequestStatus.accepted) {
      return {
        payload: [status, new Date(), id],
        sql: "UPDATE match_request SET match_request_status = ?, accepted_date = ? WHERE id = ?"
      };
    }
    return {
      payload: [status, id],
      sql: "UPDATE match_request SET match_request_status = ? WHERE id = ?"
    };
  }

  app.post('/requests/update', (req, res) => {
    const { id, status } = req.body;
    if (id && status) {
      const sql = "SELECT * FROM match_request WHERE id = ?";
      dbConn.query(sql, [id], function (err, result) {
        if (err) {
          res.status(200).jsonp({ message: "The system error, cannot update the match request. Please try again" });
        } else if (!result || result.length === 0) {
          res.status(200).jsonp({ message: "The match request did not exist in the system" });
        } else {
          const updateRequest = getUpdateRequest(id, status);
          dbConn.query(updateRequest.sql, updateRequest.payload, function (error, result) {
            if (error || !result || result.length === 0) {
              res.status(200).jsonp({ message: 'Cannot update the match request. Please try again' });
            } else {
              res.status(200).jsonp({ message: 'The match request was updated successfully' });
            }
          });
        }
      });
    } else {
      res.status(200).jsonp({ message: "Please provide id and status for the match request" });
    }
  });
};
