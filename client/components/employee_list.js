import React, { PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Employees } from '../../imports/collections/employees'
import EmployeeDetail from './employee_detail'

const PER_PAGE = 10

const EmployeeList = React.createClass ({
  componentWillMount () {
    this.page = 1
  },

  handleButtonClick () {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1))
    this.page += 1
  },

  render () {
    const renderEmployees = this.props.employees.map((employee) => (
      <EmployeeDetail employee={employee} key={employee._id} />
    ))
    return (
      <div>
        <div className="employee-list">
          {renderEmployees}
        </div>
        <button className="btn btn-primary" onClick={ this.handleButtonClick } >Load more...</button>
      </div>
    )
  }
})

export default createContainer(() => {
  // setup subscription inside container
  Meteor.subscribe('employees', PER_PAGE)

  // return an object. Whatever we return will be sent to EmployeeList
  // as props.
  return {
    employees: Employees.find({}).fetch()
  }
}, EmployeeList)
