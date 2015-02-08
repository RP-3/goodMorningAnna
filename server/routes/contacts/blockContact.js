var validator = require('../../helpers/validateRequest');

module.exports = function(router, db){

  router.post('/delete', function (req, res){

    var id = req.__AUTHORISED_id;

    var validation = validator(req.body, ['requester_id' , 'requestee_id', 'alias']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var requester_id = req.body.requester_id;
    var requestee_id = req.body.requestee_id;
    var alias = req.body.alias;

    if(id !== requestee_id) return res.status(403).send();

    //delete the targeted contact entry
    db('users')
    .del()
    .where('requester_id', requester_id)
    .andWhere('requestee_id', requestee_id)

    //delete the inverse
    .then(function(rows){
      return db('users')
      .del()
      .where('requester_id', requestee_id)
      .andWhere('requestee_id', requester_id);
    })
    //send success
    .then(function(){
      res.status(200).send();
    })

    //send the result
    .catch(function(err){
      console.log(err);
      res.status(500).send(err);
    });
  });

};
