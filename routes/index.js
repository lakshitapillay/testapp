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
    dailyusers= [];
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
                console.log(moment(user.createdOn).format('YYYY MM DD'))
                console.log(date)
                if(moment(user.createdOn).format('YYYY MM DD') == date){
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
    a = new Date(a.getTime() + a.getTimezoneOffset() * 60 * 1000);
    var b = new Date(req.body.enddate);
    b = new Date(b.getTime() + b.getTimezoneOffset() * 60 * 1000);
    b = new Date(b.getTime() + 24 * 60 * 60 * 1000);

    User.find({createdOn:{$gte:a, $lt:b}})
        .then( users => {
            res.render('data', {
                users: users,
                count: totalcount
            })
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;