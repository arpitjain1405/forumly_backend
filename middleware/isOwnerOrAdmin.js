const mongoose = require("mongoose");

module.exports = function (modelName, { adminsOnly = false } = {}) {
  return async function (req, res, next) {
    const Model = mongoose.model(modelName);

    const resourse = await Model.findById(req.params.id);
    console.log(Model);
    if (!resourse) return res.status(404).send(`${modelName} not found`);

    if (adminsOnly) {
      if (!req.user.isAdmin) return resourse.status(403).send("Admins only");
      return next();
    }

    const isOwner = resourse.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if(!isOwner && !isAdmin) return res.status(403).send("Access denied");
    next();
  };
};
