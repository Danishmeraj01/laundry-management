const colors = {
  RECEIVED:   { bg: '#dbeafe', text: '#1d4ed8' },
  PROCESSING: { bg: '#fef9c3', text: '#854d0e' },
  READY:      { bg: '#dcfce7', text: '#15803d' },
  DELIVERED:  { bg: '#f3f4f6', text: '#374151' },
};

const StatusBadge = ({ status }) => {
  const c = colors[status] || colors.RECEIVED;
  return (
    <span style={{
      background: c.bg, color: c.text,
      padding: '3px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 600,
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;