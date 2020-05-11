const env = {
  database: 'cpal',
  username: 'cpal',
  password: 'LQ2kbSERf4bMxgO2',
  host: '10.5.101.6',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
/* const env = {
  database: 'filef',
  username: 'ced',
  password: '',
  host: '10.5.101.30',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
}; */

module.exports = env;
