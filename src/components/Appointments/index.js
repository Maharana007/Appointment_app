// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  sate = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  isToggleLike = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppoint => {
        if (id === eachAppoint.id) {
          return {...eachAppoint, isLike: !eachAppoint.isLike}
        }
        return eachAppoint
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  changeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  changeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formateDate = dateInput
      ? format(new Date(dateInput), ' dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formateDate,
      isLike: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilterAppointList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isLike === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointList = this.getFilterAppointList()

    return (
      <div className="bg-container">
        <div className="container">
          <form className="form" onSubmit="addAppointment">
            <div>
              <h1 className="heading">Add Appointments</h1>
              <div>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  className="title"
                  id="title"
                  value={titleInput}
                  onChange={this.changeTitle}
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <br />
                <input
                  value={dateInput}
                  type="date"
                  className="date"
                  id="date"
                  onChange={this.changeDate}
                />
              </div>
              <button type="button" className="button">
                add
              </button>
            </div>
          </form>
          <img
            className="main-img"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
            alt="appointments"
          />
          <hr className="line" />
          <div className="appointment-star">
            <h1 className="sub-heading"> Appointments </h1>
            <button
              type="button"
              className={`stars ${filterClassName}`}
              onClick={this.onFilter}
            >
              Stared
            </button>
          </div>
          <ul className="appoint-list">
            {filterAppointList.map(eachItem => (
              <AppointmentItem
                userAppointment={eachItem}
                key={eachItem.id}
                isToggleLike={this.isToggleLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
