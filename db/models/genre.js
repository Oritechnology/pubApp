'use strict'

	const {STRING, TEXT, JSON, VIRTUAL} = require('sequelize')
	const app = require ('APP')
	const db = require('APP/db')

	module.exports = db => db.define('genre', {
		genre: STRING,

	})