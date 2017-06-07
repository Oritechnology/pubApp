'use strict'


const app = require('APP')
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