import './Notification.css'

const Notification = ({ notification }) => {
  if(notification){
    const { message, isSuccess } = notification
    if (message === null) {
      return null
    }
  
    const notificationStyle = isSuccess === true ? 'success' : 'error'
    return (
      <div className={`notification ${notificationStyle}`}>{message}</div>
    )
  }
}

export { Notification }