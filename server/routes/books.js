'use strict'

const db = require('APP/db')
const {Book, Genre, Page, User} = db


module.exports = require('express').Router()

  .get('/', 
    (req, res, next) =>
      Book.findAll({include: [Genre, Page, User]})
      .then(books => res.json(books))
      .catch(next))

  .post('/',
    (req, res, next) =>
      Book.create(req.body)
      .then(book => res.status(201).json(book))
      .catch(next))

  .get('/:id',
    (req, res, next) =>
      Book.findById(req.params.id, {
        include: [Genre, Page, User]
      })
      .then(book => res.json(book))
      .catch(next))

  .put('/:id', 
      (req, res, next) =>
      Book.findById(req.params.id)
      .then(book => book.update(req.body))
      .then(updatedBook => res.status(200).json(updatedBook))
      .catch(next))

  .delete('/:id',
      (req, res, next) =>
      Book.findById(req.params.id)
      .then(book => book.destroy())
      .then(() => res.sendStatus(204))
      .catch(next))

