const db = require('./db')
const mysql = require('mysql')
// const connection = mysql.createConnection(db)
// connection.connect()
// module.exports = connection

const pool = mysql.createPool(db)
const mysql_query =async function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) return reject(err)
      connection.query(sql, values, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
        connection.release()
      })
    })
  })
}


module.exports = mysql_query;