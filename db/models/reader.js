'use strict'


const app = require('app')
const sqlize = require('sequelize')
const db = require('..')

module.exports = db => db.define('reader' {
  name: String,
  email: { 
    type:sqlize.String
    validate: {
      isEmail: true
    }
  },
  password: STRING,
})