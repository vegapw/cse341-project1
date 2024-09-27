const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = mongoDB.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });  
};

const getContactById = async (req, res) => {
  //#swagger.tags=['Contacts']
    const contactId = ObjectId.createFromHexString(req.params.id);
    const result = mongoDB.getDatabase().db().collection('contacts').find({_id:contactId});
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);
    });  
  };

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName : req.body.firstName, 
    lastName : req.body.lastName ,
    email : req.body.email, 
    favoriteColor : req.body.favoriteColor, 
    birthday : req.body.birthday
  };
  const result = await mongoDB.getDatabase().db().collection('contacts').insertOne(contact);
  if (result.acknowledged) {
    //res.status(204).json(`{"id": "${result.insertedId.toString()}"}`);
    res.status(204).send(result.insertedId.toString());
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = ObjectId.createFromHexString(req.params.id);
  const contact = {
    firstName : req.body.firstName, 
    lastName : req.body.lastName ,
    email : req.body.email, 
    favoriteColor : req.body.favoriteColor, 
    birthday : req.body.birthday
  };
  const result = await mongoDB.getDatabase().db().collection('contacts').replaceOne({_id:contactId}, contact);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = ObjectId.createFromHexString(req.params.id);
  const result = await mongoDB.getDatabase().db().collection('contacts').deleteOne({_id:contactId});
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

  module.exports = 
    {getAll, 
    getContactById, 
    createContact,
    updateContact,
    deleteContact
    }