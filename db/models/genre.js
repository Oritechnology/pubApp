'use strict'

	const sqlize = require ('sequelize')
	const app = require ('APP')
	const db = require ('..')

	module.exports = db => db.define('genre' {
		genre: String,

	})