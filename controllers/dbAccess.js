const db = require("../config/db.config");
const Op = db.Op;
// DA CANCELLARE ALLA FINE
exports.provaToMany = (req ,res, next) => {
  let autoOpt = require('../fields/auto.js');
  let marcheOpt = require('../fields/marche.js');
  db.auto = require("../models/model")(db,autoOpt.fields,'auto')
  db.marche = require("../models/model")(db,marcheOpt.fields,'marche')

  /* db.marche.associate = models => {
    models.db.marche.hasMany(db.auto)
  }
  db.marche.hasMany(db.auto); */
  db.auto.belongsTo(db.marche,{as: 'marca', foreignKey: 'marcheId'});
  
  db.auto.findAll({
    include: [{
      model: db.marche, as: 'marca'
    }]
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send("Error -> " + err);
  });
}

exports.find = (req, res, next) => {  
  db[req.body.table] = require("../models/model.js")(db, req.body.fields, req.body.table);  
  let queryopt = {}
  let queryKeys = Object.keys(req.body.query);
  queryKeys.forEach(element => {
    switch (req.body.query[element].type) {
      case 'where':
        queryopt[element] = req.body.query[element].value
        break;
      case 'orwhere':
        queryopt[element] = {
          [Op.or]: req.body.query[element].value
        }
        break;
      case 'like':
        queryopt[element] = {
          [Op.like]: req.body.query[element].value
        }
        break;
      case 'Op.gt':
        queryopt[element] = {
          [Op.gt]: req.body.query[element].value
        }
        break;
      case 'Op.gte':
        queryopt[element] = {
          [Op.gte]: req.body.query[element].value
        }
        break;
      case 'Op.lt':
        queryopt[element] = {
          [Op.lt]: req.body.query[element].value
        }
        break;
      case 'Op.lte':
        queryopt[element] = {
          [Op.lte]: req.body.query[element].value
        }
        break;
      case 'Op.ne':
        queryopt[element] = {
          [Op.ne]: req.body.query[element].value
        }
        break;
      case 'Op.ne':
        queryopt[element] = {
          [Op.ne]: req.body.query[element].value
        }
        break;
      case 'Op.eq':
        queryopt[element] = {
          [Op.eq]: req.body.query[element].value
        }
        break;
      case 'Op.between':
        queryopt[element] = {
          [Op.between]: req.body.query[element].value
        }
        break;
      case 'Op.notbetween':
        queryopt[element] = {
          [Op.notbetween]: req.body.query[element].value
        }
        break;
      case 'Op.in':
        queryopt[element] = {
          [Op.in]: req.body.query[element].value
        }
        break;
      case 'Op.notIn':
        queryopt[element] = {
          [Op.notIn]: req.body.query[element].value
        }
        break;

      default:
        return;
    }
  });
  let fieldKeys = Object.keys(req.body.fields);
  let include = [];
  let models = [];
  fieldKeys.forEach(element => {
    if (req.body.fields[element].foreignKey === true) {
      let refFields = require('../fields/' + req.body.fields[element].references + '.js');
      db[req.body.fields[element].references] = require("../models/model.js")(db, refFields.fields, req.body.fields[element].references);
      db[req.body.table].belongsTo(db[req.body.fields[element].references],{as: req.body.fields[element].references, foreignKey: element});
      include.push({
        model: db[req.body.fields[element].references],
        as: req.body.fields[element].references
      });
      models.push([req.body.fields[element].references]);
    }
  })
  db[req.body.table].findAll({
      where: queryopt,
      include: include
    })
    .then(result => {
      delete db[req.body.table];
      models.forEach(element => {
        delete db[element];
      })
      res.send(result)
    })
    .catch(err => {
      delete db[req.body.table];
      models.forEach(element => {
        delete db[element];
      })
      res.status(500).send("Error -> " + err);
    });
};

exports.insert = (req, res, next) => {
  db[req.body.table]= require("../models/model.js")(db, req.body.fields, req.body.table);
  let keys = Object.keys(req.body.fields);
  let data = {};
  keys.forEach(element => {
    data[element] = req.body.fields[element].value
  });
  db[req.body.table].create(data)
    .then(() => {
      delete db[req.body.table];
      res.status(200).send(data);
    })
    .catch(err => {
      delete db[req.body.table];
      res.status(500).send("Error -> " + err);
    })
};

exports.update = (req, res, next) => {
  db[req.body.table] = require("../models/model.js")(db, req.body.fields, req.body.table);
  let keys = Object.keys(req.body.fields);
  let data = {};
  keys.forEach(element => {
    data[element] = req.body.fields[element].value
  });
  db[req.body.table].update(data,{ where: {id: req.body.fields.id.value} })
    .then(() => {
      delete db[req.body.table];
      res.status(200).send('modificato');
    })
    .catch(err => {
      delete db[req.body.table];
      res.status(500).send("Error -> " + err);
    })
}