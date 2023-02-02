const Notification = ({ message }) => {
  if (!message) return null;

  const notificationStyle = {
    color: 'green',
    fontSize: '1.5em',
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderColor: 'current',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
