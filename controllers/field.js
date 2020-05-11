exports.getByName = (req, res, next) => {
    let fields = require(`../fields/${req.params.name}`);
    res.send(fields);
}