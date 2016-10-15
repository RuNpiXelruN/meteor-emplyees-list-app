// only executed in the server
import _ from 'lodash'
import { Meteor } from 'meteor/meteor'
import { Employees } from '../imports/collections/employees'
import { image, helpers } from 'faker'

Meteor.startup(() => {
  // generate data here!

  // first check to see if data exists in collection
  // see if collection has any records
  const numberOfRecords = Employees.find({}).count()
  if (!numberOfRecords) {
    // generate some data
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard()

      Employees.insert({
        name,
        email,
        phone,
        avatar: image.avatar()
      })
    })
  }

  Meteor.publish('employees', (per_page) => {
    return Employees.find({}, { limit: per_page })
  })
})
