// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {userAppointment, isToggleLike} = props
  const {id, title, date, isLike} = userAppointment
  const starImg = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isToggleLike(id)
  }

  return (
    <li className="list">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImg} className="star" alt="star" />
        </button>
      </div>

      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
