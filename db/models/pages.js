'use strict'

const {STRING, TEXT, JSON, VIRTUAL} = require('sequelize')
const app = require('APP')
const db = require('APP/db')

module.exports = db => db.define('page', {
  text: TEXT,  
})

module.exports.associations = (Page, { Book }) => {
  Page.belongsTo(Book)
}