'use strict'

const db = require('APP/db')
const {Book, Genre, Page, User} = db


module.exports = require('express').Router()

  .get('/',
    (req, res, next) =>
      Page.findAll({include: [Genre, Page, User]})
      .then(books => res.json(books))
      .catch(next))

  .post('/',
    (req, res, next) =>
      Page.create(req.body)
      .then(Page => res.status(201).json(Page))
      .catch(next))

  .get('/:id',
    (req, res, next) =>
      Page.findById(req.params.id, {
        include: [Genre, Page, User]
      })
      .then(Page => res.json(Page))
      .catch(next))

  .put('/:id',
      (req, res, next) =>
      Page.findById(req.params.id)
      .then(Page => Page.update(req.body))
      .then(updatedBook => res.status(200).json(updatedBook))
      .catch(next))

  .delete('/:id',
      (req, res, next) =>
      Page.findById(req.params.id)
      .then(page => page.destroy())
      .then(() => res.sendStatus(204))
      .catch(next))
