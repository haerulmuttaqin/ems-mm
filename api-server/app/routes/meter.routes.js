const controller = require("../controllers/meter/meter.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/group_meter", controller.getMeterGroup);
    app.get("/api/group_meter/group/:groupID", controller.getMeterByGroupID);
    app.get("/api/counter_live/meter/:meterID", controller.getCounterLiveByMeterID);
    app.get("/api/counter_live/all/meter/:meterID", controller.getAllCounterLiveByMeterID);
};