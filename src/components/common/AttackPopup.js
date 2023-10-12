import React from "react";

const styles = {
  attackContainer: {
    border: "1px solid #a5e54d",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "12px",
    margin: "8px 0",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  attackContainerHover: {
    transform: "translateY(-5px)",
  },
  attackInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  attackName: {
    fontWeight: "bold",
  },
  attackDamage: {
    flex: 1,
    textAlign: "right",
  },
  attackDescription: {
    flex: 1,
    textAlign: "left",
    color: "black",
  },
  attackEnergyCost: {
    alignSelf: "flex-end",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#4b770e",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

const AttackPopup = ({
  name,
  damage,
  description,
  energyCost,
  onAttackClick,
  closeAttackPopup,
  removeAttackButton
}) => {
  return (
    <div
      style={{
        ...styles.attackContainer,
      }}
      onClick={onAttackClick}
    >
      <div style={styles.attackInfo}>
        <div style={styles.attackName}>{name}</div>
        <div style={styles.attackDamage}>{damage}</div>
      </div>
      <div style={styles.attackDescription}>{description}</div>
      <div style={styles.attackEnergyCost}>Cost: {energyCost}</div>
      {!removeAttackButton && ( // Render the attack button only if not disabled
        <button style={styles.button} onClick={onAttackClick}>
          Attack
        </button>
      )}
      <button style={styles.button} onClick={closeAttackPopup}>
        Close
      </button>
    </div>
  );
};

export default AttackPopup;
