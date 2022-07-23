const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all subscribers
router.get('/',async (req ,res )=>{
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})
// Getting one subscriber
router.get('/:id',getSubscriber,async (req ,res)=>{
    // res.send(req.params.id)
        res.json(res.subsciber);
})
// Creating one subscriber
router.post('/',async (req , res)=>{
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})
// Updating one subscriber (based on what user passes -> patch)
router.patch('/:id',getSubscriber,async (req , res)=>{

})
// Deleting one subscriber
router.delete('/:id',getSubscriber,async(req ,res )=>{

})

// middleware 
async function getSubscriber(req ,res ,next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message : 'Cannot find subscriber'});
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }
    res.subsciber = subscriber;
    next();
}

module.exports = router;