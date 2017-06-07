'use strict'

const db = require('APP/db')
const {User, Book, Genre, Page} = db
const Promise = require('bluebird')
const {mapValues} = require('lodash')
console.log("DB", db.config)
function seedEverything() {
  const seeded = {
    users: users(),
    books: books(),
    genres: genres(),
  }
  seeded.pages = pages(seeded)
  // seeded.relationships = relationships(seeded)

  return Promise.props(seeded)
}


const users = seed(User,
  ({users, Books, Genres}) => ({
      alex: {
        email: 'alex@123.com',
        name:'Alex Moore',
        password: '123',
        is_user:true,
      },
      Kris: {
        name: 'Kris Lee',
        email: 'Kris@123.com',
        password: '123',
        is_user:true,
      },
      hb1: {
        name: 'Devin Isafilthylil Beyotch',
        email: 'devin@hireblack.io',
        password: '123',
        is_user:true,
      },
      hb2: {
        name: 'Chloe Rice',
        email: 'chloe@hireblack.io',
        password: '123',
        is_user:true,

      },
}))

const books = seed(Book, {
  Bluest_eye: {
    name: 'The Bluest Eye',
    genre: 'drama',
    pages: 87
  },
  Laws: {
    name: '48 Laws of Power',
    genre: 'nonfiction',
    pages: 334
  },
  Green_Eggs: {
    name: 'Green Eggs & Ham',
    genre: 'children',
    pages: 17
  },
})

const genres = seed(Genre, {
  fiction: {title: 'fiction'},
  children: {title: 'children\'s',},
  nonfiction: {title: 'nonfiction',},
  drama: {title: 'drama',},
  romance: {title: 'romance',},
  horror: {title: 'horror', },
})

const pages = seed(Page,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({books}) => {
    return ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'full_stack': {
      book_id: books.Bluest_eye.id,
      page_num:1,
    },
    'dev_ops': {
      book_id: books.Bluest_eye.id,
      page_num:1,
    },
  })
}
)

// const relationships = seed(Page,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({Pages}) => {
//     const Pages1 = Pagess.full_stack
//     const Pages2 = Pagess.dev_ops
//     const Genres = {
//       1: [1, 2, 3],
//       2: [4, 5, 6]
//     }

//     const PagesArray = [Pages1, Pages2]
//     return Promise.props(PagesArray, (Pages) => Pages.addGenres(Genres[`${Pages.get().id}`]))
//     .then(success => console.log(success))
//   }
// )

if (module === require.main) {
  console.log('seeding')
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }
    return Promise.resolve(rows)
      .then(rows => {
        console.log("ROWS", rows)
        return Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      })
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {User, Book, Page, Genre})