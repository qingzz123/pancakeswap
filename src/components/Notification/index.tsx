import { notification } from 'antd'

const Notification = (message: string, description: string, type: string, iconBackColor: string) => {
  notification[type]({
    message,
    description,
    className: 'custom-class notification',
    // duration: 30000,
    maxCount: 1,
    style: {
      background: iconBackColor,
      wordBreak: 'break-all',
    },
  })
}

Notification.Success = (message: string, description?: string) => {
  Notification(message, description, 'success', '#31d0aa')
}
Notification.Error = (message: string, description?: string) => {
  Notification(message, description, 'error', '#ed4b9e')
}
Notification.Info = (message: string, description?: string) => {
  Notification(message, description, 'info', '#7645d9')
}
Notification.Warning = (message: string, description?: string) => {
  Notification(message, description, 'warning', '#ffb237')
}

export default Notification
