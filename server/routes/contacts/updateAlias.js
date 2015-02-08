var validator = require('../../helpers/validateRequest');

module.exports = function(router, db){

  router.put('/alias', function (req, res){

    var id = req.__AUTHORISED_id;

    var validation = validator(req.body, ['requestee_id', 'alias']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var requester_id = req.body.requester_id;
    var requestee_id = req.body.requestee_id;
    var alias = req.body.alias;

    if(id !== requestee_id) return res.status(403).send();

    //update the targeted contact entry
    db('users')
    .update({
      alias: alias
    })
    .where('requester_id', id)
    .andWhere('requestee_id', requestee_id)

    //send success
    .then(function(rows){
      console.log('updated rows: ', rows);
      if(rows.length === 0) throw new Error('Requested contact does not exist');

      res.status(200).send();
    })

    //send the result
    .catch(function(err){
      console.log(err);

      if(err.message === 'Requested contact does not exist') return res.status(400).send(err.message);

      res.status(500).send(err);
    });
  });

};
