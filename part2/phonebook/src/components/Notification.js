const Notification = ({ message, status }) => {
  if (!message) return null;

  const messageStyle = {
    fontSize: '1.5em',
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderColor: 'current',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  };

  const color = status === 'success' ? 'green' : 'red';

  const notificationStyle = {
    ...messageStyle,
    color: color,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
