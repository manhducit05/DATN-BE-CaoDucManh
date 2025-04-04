const ModelListRoute = require("./ModelList.route")
const GARoute = require("./GA.route")

module.exports = (app) => {
    app.use('', ModelListRoute)
    app.use('', GARoute)
}