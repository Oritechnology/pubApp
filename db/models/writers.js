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
  password_digest: STRING,
})


module.exports.associations = (Writer, {pages, reader}) => {
  Writer.hasOne('book')
  Writer.belongsToMany(reader {
    as: 'reader',
    through:reader,
    foreignKey: 'reader_id'
  });
  .belongsToMany('pages') {
    as:'pages',
    through: pages,
    foreignKey: 'pages_id'
  } 
}