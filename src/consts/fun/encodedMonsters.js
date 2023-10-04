// Define mappings for each field
const characterTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const traitOptions = ['1', '2', '3'];
const colors = ['X', 'Y'];
const others = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];

// Encode a creature based on its attributes
function encodeCreature(characterType, traitOption, color, other) {
  const encodedCharacterType = characterTypes.indexOf(characterType);
  const encodedTraitOption = traitOptions.indexOf(traitOption);
  const encodedColor = colors.indexOf(color);
  const encodedOther = others.indexOf(other);
  
  return `${encodedCharacterType}${encodedTraitOption}${encodedColor}${encodedOther}`;
}

// Decode an encoded ID to retrieve creature attributes
function decodeCreature(encodedID) {
  const encodedCharacterType = parseInt(encodedID[0]);
  const encodedTraitOption = parseInt(encodedID[1]);
  const encodedColor = parseInt(encodedID[2]);
  const encodedOther = parseInt(encodedID[3]);
  
  const characterType = characterTypes[encodedCharacterType];
  const traitOption = traitOptions[encodedTraitOption];
  const color = colors[encodedColor];
  const other = others[encodedOther];
  
  return {
    characterType,
    traitOption,
    color,
    other,
  };
}

// Example usage
const creature = {
  characterType: 'C',
  traitOption: '2',
  color: 'X',
  other: 'P',
};

const encodedID = encodeCreature(creature.characterType, creature.traitOption, creature.color, creature.other);
console.log("Encoded ID:", encodedID);

const decodedCreature = decodeCreature(encodedID);
console.log("Decoded Creature:", decodedCreature);
