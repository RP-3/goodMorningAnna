var validator = require('../../helpers/validateRequest');

module.exports = function(router, db){

  router.post('/accept', function (req, res){

    var id = req.__AUTHORISED_id;

    var validation = validator(req.body, ['requester_id', 'requestee_id', 'alias']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var requester_id = req.body.requester_id;
    var requestee_id = req.body.requestee_id;
    var alias = req.body.alias;

    if(id !== requestee_id) return res.status(403).send();

    //perform the update
    db.transaction(function(t) {
     return db('contacts')
      .transacting(t)
      .update({approved: true})
      .where('requester_id', requester_id)
      .andWhere('requestee_id', requestee_id)

      .then(function() {
          //create a matching contact entry
          return db('contacts')
            .insert({
              requester_id: requestee_id,
              requestee_id: requester_id,
              alias: alias,
              approved: true
            });
       });
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function(e) {
      res.status(400).send(e);
    });

  });

};
