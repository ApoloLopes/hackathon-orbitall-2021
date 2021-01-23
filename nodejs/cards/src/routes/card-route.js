const api = require('../controllers/card-controller')

module.exports = (app) => {
    app.route('/cards')
        .get(api.findAll)
        .post(api.save)
        .get(api.findById)
        .delete(api.deleteById)
        .put(api.update)

}
