const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAll = async (req, res) => {
  const result = mongoDB.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });  
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = mongoDB.getDatabase().db().collection('contacts').find({_id:contactId});
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);
    });  
  };

  module.exports = {getAll, getContactById}