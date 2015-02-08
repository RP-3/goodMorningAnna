
module.exports = function(router, db){

  router.get('/all', function (req, res){
    var id = req.__AUTHORISED_id;

    //get all contact requests
    db
    .select()
    .from('contacts')
    .where('requester_id', id)
    .orWhere('requestee_id', id)

    //send the result
    .then(function(rows){
      res.status(200)
        .type('application/json')
        .send(rows);
    })
    //Error handling
    .catch(function(err){
      console.log(err);
      res.status(500).send(err);
    });
  });

};
