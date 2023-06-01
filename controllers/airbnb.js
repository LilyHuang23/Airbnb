const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('airbnb_info').collection('airbnb').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const infoId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('airbnb_info').collection('airbnb').find({ _id: infoId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createInfo = async (req, res) => {
  const info = {
    listing_url:req.body.listing_url,
    name:listing_url.name,
    description:req.body.description,
    transit:req.body.transit,
    interaction:req.body.interaction,
    house_rules:req.body.house_rules,
    property_type:req.body.property_type,
    room_type:req.body.room_type,
    bed_type:req.body.bed_type,
    minimum_nights:req.body.minimum_nights,
    maximum_nights:req.body.maximum_nights,
    cancellation_policy:req.body.cancellation_policy,
    price:req.body.price,
    weekly_price:req.body.weekly_price,
    monthly_price:req.body.monthly_price,
    cleaning_fee:req.body.cleaning_fee,
    extra_people:req.body.extra_people,
    guests_included:req.body.guests_included,
    images:req.body.images
  };
  const response = await mongodb.getDb().db('airbnb_info').collection('airbnb').insertOne(info);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Info.');
  }
};

const updateInfo = async (req, res) => {
  const infoId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const info = {
    listing_url:req.body.listing_url,
    name:listing_url.name,
    description:req.body.description,
    transit:req.body.transit,
    interaction:req.body.interaction,
    house_rules:req.body.house_rules,
    property_type:req.body.property_type,
    room_type:req.body.room_type,
    bed_type:req.body.bed_type,
    minimum_nights:req.body.minimum_nights,
    maximum_nights:req.body.maximum_nights,
    cancellation_policy:req.body.cancellation_policy,
    price:req.body.price,
    weekly_price:req.body.weekly_price,
    monthly_price:req.body.monthly_price,
    cleaning_fee:req.body.cleaning_fee,
    extra_people:req.body.extra_people,
    guests_included:req.body.guests_included,
    images:req.body.images
  };
  const response = await mongodb
    .getDb()
    .db('airbnb_info')
    .collection('airbnb')
    .replaceOne({ _id: infoId }, info);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the information.');
  }
};

const deleteInfo = async (req, res) => {
  const infoId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('airbnb_info').collection('airbnb').deleteOne({_id: infoId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the information.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createInfo,
  updateInfo,
  deleteInfo
};
