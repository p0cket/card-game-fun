import React, { useState } from 'react';

const ChibipalsSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const monsters = [
    { id: 1, name: 'Monster1', image: 'monster1.png', description: 'Description of Monster1' },
    { id: 2, name: 'Monster2', image: '', description: 'Description of Monster2' }, // No image available
    { id: 3, name: 'Monster3', image: 'monster3.png', description: 'Description of Monster3' },
  ];

  const handleMonsterSelect = (monster) => {
    setSelectedMonster(monster);
    setShowDetails(true);
  };

  const handleSelect = () => {
    // dispatch({ type: 'ADD_TO_PARTY', monster: selectedMonster });
    setShowDetails(false);
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'green',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    color: 'white',
    textAlign: 'center',
  };

  const monsterListStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const placeholderImageStyle = {
    backgroundColor: 'green',
    borderRadius: '50%',
    width: '100%',
    paddingTop: '100%',
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Choose Your Chibipal</h1>
      <div className="monster-list" style={monsterListStyle}>
        {monsters.map((monster) => (
          <div
            key={monster.id}
            className={`monster ${selectedMonster === monster ? 'selected' : ''}`}
            onClick={() => handleMonsterSelect(monster)}
            style={{ flex: '1', margin: '10px', cursor: 'pointer' }}
          >
            <div
              style={placeholderImageStyle}
              className={monster.image ? 'with-image' : 'without-image'}
            >
              {monster.image && (
                <img
                  src={monster.image}
                  alt={monster.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              )}
            </div>
            <p style={{ color: 'white' }}>{monster.name}</p>
          </div>
        ))}
      </div>

      {showDetails && (
        <div style={popupStyle}>
          <div className="popup-content">
            <h2>{selectedMonster.name}</h2>
            <div style={{ width: '100%', height: '100px', backgroundColor: 'green', borderRadius: '50%', marginBottom: '10px' }}></div>
            <p>{selectedMonster.description}</p>
            <button onClick={handleSelect} style={{ marginRight: '10px' }}>Select</button>
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChibipalsSelection;
