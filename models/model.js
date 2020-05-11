module.exports = (db,fields,table) => {
    let keys = Object.keys(fields);
    let dbFields = {};
    keys.forEach(element => {
        dbFields[fields[element].dbField] = {
            type: db.Sequelize[fields[element].typeDbField],
            primaryKey: fields[element].primaryKey
        }
    })
    const Model = db.sequelize.define(table,dbFields,
    {
		tableName: table,
		timestamps: false
    });
	return Model;
}
