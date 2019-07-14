const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

const User = require('../models/User');

var totalcount;
var dailyusers= [];

router.get('/',(req, res) => {
    /*
    const user = new User({
        email:'john@gmail.com',
        name:'John Doe',
        location: 'Mumbai Maharashtra India',
        mobileNumber: '3255645125',
        standard: 'class 12',
        lastActive: '2019-05-18T16:00:00Z'
    });
    user.save()
        .then(() => {
            console.log('data added');
        })
        .catch(err => {
            console.log(err);
        });
    */
    
    User.collection.count({}, (err, count) => {
        if(err){
            console.log(err);
        }
        else{
            totalcount = count;
        }
    });
   
    var date = moment().format('YYYY MM DD');
    User.find({})
        .then( users => {
            
            users.forEach( user => {
                if(moment(user.createdOn).format('YYYY MM DD') == moment().format('YYYY MM DD')){
                    /*console.log(moment(user.createdOn).format('YYYY MM DD'));
                    console.log(moment().format('YYYY MM DD'));
                    console.log(user.createdOn);*/
                    var currentdate = new Date();
                    dailyusers.push(user);
                }
            })

            res.render('data', {
                dailyusers: dailyusers,
                count:totalcount
            });
        })
        .catch(err => console.log(err));
    
});

router.post('/users', (req, res) => {
    var a = new Date(req.body.startdate);
    var b = new Date(req.body.enddate);
    User.find({createdOn:{$gte:a, $lt:b}})
        .then( users => {
            res.render('data', {
                users: users,
                count: totalcount
            })
        })
});

module.exports = router;