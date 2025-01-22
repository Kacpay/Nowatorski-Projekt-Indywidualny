import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Board4x4 = () => {
  const [board, setBoard] = useState(Array.from({ length: 16 }, (_, i) => i));

  const isNeighbor = (index1, index2) => {
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2) 
    );
  };

  
  const handlePress = (index) => {
    const zeroIndex = board.indexOf(0);
    if (isNeighbor(index, zeroIndex)) {
      const newBoard = [...board];
      // Zamiana miejscami elementu klikniętego i elementu o indeksie 0
      [newBoard[zeroIndex], newBoard[index]] = [newBoard[index], newBoard[zeroIndex]];
      setBoard(newBoard);
    }
  };

  return (
    <View style={styles.container}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tile, value === 0 && styles.zeroTile]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.tileText}>{value !== 0 ? value : ''}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    width: '25%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ddd',
  },
  zeroTile: {
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Board4x4;
