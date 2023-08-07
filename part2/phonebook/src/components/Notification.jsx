const Notification = ({ notification }) => {
  return (
    <div className={notification.type === 'success' ? 'success' : 'error'}>
      {notification.message}
    </div>
  );
};

export default Notification;
