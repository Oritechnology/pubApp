'use strict'

const app = require('APP')
  ,   sqlize = require('sequelize')
  ,   db = require('..')
  , reader =require('./reader')


module.exports = db => db.define('writers'{
  name: String,
  email: {
    type:sqlize.String,
    validate: 
      {isEmail:true,
    }
  },
  password: Virtual,
  password_digest: String
})