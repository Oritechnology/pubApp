'use strict'

const {STRING, TEXT, JSON, VIRTUAL} = require('sequelize')
const app = require('APP')
const db = require('..')

module.exports = db => db.define('book' {
  name: STRING,
})

module.exports.associations = (Book, { User, Genre }) => {
  Book.hasOne(User)
  Book.belongsToMany(Genre, {
    as: 'genres',
    foreignKey: 'genre_id'
  })
}