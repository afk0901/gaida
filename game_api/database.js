module.exports = function(context) {
  const Client = context('pgClient');
  const configConstructor = context('config');
  const config = configConstructor(context);

  function getClient() {
    return new Client({
      host: config.pgHost,
      user: config.pgUser,
      password: config.pgPassword,
      database: config.pgDatabase,
    });
  }

  setTimeout(() => {
    const client = getClient();
    client.connect((err) => {
      if (err) {
        console.log('failed to connect to postgres!##$#"$"#$$"#');
      } else {
        console.log('successfully connected to postgres!');
        client.query('CREATE TABLE IF NOT EXISTS GameResult (ID SERIAL PRIMARY KEY, Won BOOL NOT NULL,'+
          'Score INT NOT NULL, Total INT NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
          if (err) {
            console.log('error creating game result table!');
          } else {
            console.log('successfully created game result table!');
          }
          client.end();
        });
      }
    });
  }, 5000);

  return {
    insertResult: (won, score, total, onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'INSERT INTO GameResult(Won, Score, Total, InsertDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
            values: [won, score, total],
          };
          client.query(query, (err) => {
            if (err) {
              onError(err);
            } else {
              onSuccess();
            }total;
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOfGames: (onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'SELECT won FROM GameResult',
          };
          client.query(query, (err, res) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(res.rows.length);
            }
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOfWins: (onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
        } else {
          const query = {
            text: 'SELECT won FROM GameResult WHERE won = TRUE',
          };
          client.query(query, (err, res) => {
            if (err) {
              onError(err);
            } else {
              console.log(res);
              onSuccess(res.rows.length);
            }
          });
        }
      });
    },
    // Should call onSuccess with integer.
    getTotalNumberOf21: (onSuccess, onError) => {
      const client = getClient();
      client.connect( (err) => {
        if (err) {
          onError(err);
        } else {
          const query = {
            text: 'SELECT Total FROM GameResult WHERE Total = 21',
          };
          client.query(query, (err, res) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(res.rows.length);
            }
          });
        }
      });
    },
  };
};
