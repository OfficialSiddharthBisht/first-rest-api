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
    if(req.body.name != null){
        res.subsciber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null){
        res.subsciber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try{
        const updatedSubscriber = await res.subsciber.save();
        res.json(updatedSubscriber);
    }catch(error){
        res.status(400).json({message : error.message});
    }
})
// Deleting one subscriber
router.delete('/:id',getSubscriber,async(req ,res )=>{
    try{
        await res.subsciber.remove();
        res.json({message : "Deleted Subsciber"})
    }catch{
        res.status(500).json({message : err.message})
    }
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