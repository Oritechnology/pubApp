'use strict'

const {STRING, TEXT, JSON, VIRTUAL} = require('sequelize')
const app = require('APP')
const db = require('APP/db')

module.exports = db => db.define('book', {
  name: STRING,
})

module.exports.associations = (Book, { User, Genre }) => {
  Book.hasOne(User)
  Book.belongsToMany(Genre, {
    as: 'genres',
    through:'book_genre',
    foreignKey: 'genre_id'
  })
}