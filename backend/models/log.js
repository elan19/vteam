const database = require('../databases/sql/database.js');

/**
 * A model representing operations related to the Log table in the database.
 * @namespace
 */
const logModel = {
  /**
   * Get all information in the Log table in the database (All entries).
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  getAll: function (res) {
    database.all('SELECT * FROM Log', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  },

  /**
   * Get all logs for a specific user based on their userId.
   * @param {string|number} userId - The userId of the user to retrieve logs for.
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  getOneUser: function (userId, res) {
    const sql = 'SELECT * FROM Log WHERE user_userid = ?';
    database.all(sql, [userId], function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  },

  /**
   * Create a new log entry in the database with the specified values.
   * @param {Object} log - The log object containing user_userid, scooterId, startTime, stopTime, returnTime, price, and totalPrice.
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  create: function (log, res) {
    const dateNow = new Date(log.startTime);
    const dateStartTimeString = dateNow.toLocaleString("sv-SE");
  
    const dateStopTime = new Date(log.stopTime);
    const dateStopTimeString = dateStopTime.toLocaleString("sv-SE");
  
    const dateReturnTime = new Date(log.returnTime);
    const dateReturnTimeString = dateReturnTime.toLocaleString("sv-SE");
  
    const sql = 'INSERT INTO Log (user_userid, scooterId, startTime, stopTime, returnTime, price, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [log.user_userid, log.scooterId, dateStartTimeString, dateStopTimeString, dateReturnTimeString, log.price, log.totalPrice];
  
    database.run(sql, params, function (error) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Log created successfully', logId: this.lastID });
      console.log('Log created successfully. Last inserted ID:', this.lastID);
    });
  },

  /**
   * Update an existing log entry with the specified values.
   * @param {string|number} logId - The logId of the log entry to update.
   * @param {Object} log - The updated log object containing user_userid, scooterId, startTime, stopTime, returnTime, price, totalPrice, and returned.
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  update: function (logId, log, res) {
    const sql = 'UPDATE Log SET ' +
      'user_userid = COALESCE(?, user_userid), ' +
      'scooterId = COALESCE(?, scooterId), ' +
      'startTime = COALESCE(?, startTime), ' +
      'stopTime = COALESCE(?, stopTime), ' +
      'returnTime = COALESCE(?, returnTime), ' +
      'price = COALESCE(?, price), ' +
      'totalPrice = COALESCE(?, totalPrice), ' +
      'WHERE logId = ?';

    const params = [
      log.user_userid || null,
      log.scooterId || null,
      log.startTime || null,
      log.stopTime || null,
      log.returnTime || null,
      log.price || null,
      log.totalPrice || null,
      log.returned || null,
      logId
    ];

    database.run(sql, params, function (error) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Log updated successfully' });
      console.log('Log updated successfully.');
    });
  },

  /**
   * Delete a log entry from the database by its logId.
   * @param {number} logId - The logId of the log entry to delete.
   * @param {Object} res - The Express response object.
   * @returns {void}
   */
  delete: function (logId, res) {
    const sql = 'DELETE FROM Log WHERE logId = ?';
    database.run(sql, [logId], function (error) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Log deleted successfully' });
    });
  }
};

module.exports = logModel;
