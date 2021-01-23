const neDB = require('../configurations/database')
const { request, response } = require('../configurations/express')
const api = {}

api.findAll = (request, response) => {
    neDB.find({}).sort({ name: 1 }).exec((exception, cards) => {
        if (exception) {
            const setence = 'Não foi possivel listar todos os cartoes'
            console.log(setence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.status(200)
        response.json(cards)
    })
}

api.save = (request, response) => {
    const canonical = request.body
    neDB.insert(canonical, (exception, card) => {
        if (exception) {
            const setence = 'Nao foi possivel adicionar o novo cartao'
            console.log(setence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.status(201)
        response.json(card)
    })
}

api.findById = ( "/cards/:cardId", function ( req, res ) {
    
    if ( !req.params.cardId ) {
      res.status( 500 ).send( "ID field is required." );
    } else {
      neDB.findOne( {
        _id: req.params.cardId
      }, function ( err, card ) {
        res.send( card );
        res.status(200);
      } );
    }
  } );

  api.deleteById = ("/cards/:cardId", function ( req, res ) {

    neDB.remove( {
      _id: req.params.customerId
    }, function ( err, numRemoved ) {
      if ( err ) res.status( 500 ).send( err );
      else res.sendStatus( 200 );
    });
  });

  api.update = (req, res) => {

    if(!api.utils.validator.user(app, req, res)) return false;

    neDB.update({_id:req.params.id}, req.body, err => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body));
      }
    });
  }

module.exports = api