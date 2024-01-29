// ToasterCanvas.js
export default function ToasterCanvas({ message, show, onClose }) {
    if (!show) return null;
  
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
      }}>
        {message}
        <button onClick={onClose} style={{ marginLeft: '10px', color: '#fff', background: 'red', border: 'none', borderRadius: '5px' }}>X</button>
      </div>
    );
  }
  