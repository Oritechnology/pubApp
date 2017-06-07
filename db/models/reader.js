'use strict'


const app = require('APP')
const sqlize = require('sequelize')
const db = require('..')
const writer = require('writers')
const pages = require('pages')

module.exports = db => db.define('reader' {
  name: String,
  email: { 
    type:sqlize.String
    validate: {
      isEmail: true
    }
  },
  password: STRING,
  password_digest: Virtual,
})

module.exports.associations = (reader, {pages, writers, books}) => {
  reader.belongsToMany(writers {
    as:'writers',
    through:writers,
    foreignKey: 'writer_id'
  });
  .belongsToMany(books {
    as:'books'
    through: books
    foreignKey: 'book_id'
  })

}