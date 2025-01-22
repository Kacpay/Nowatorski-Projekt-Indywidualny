import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

const Board4x4 = (props) => {
  const { colorScheme, theme } = useContext(ThemeContext);

  const initialBoard = [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [board, setBoard] = useState(initialBoard);

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

  useEffect(() => {
    const isSolution = board.every((value, index) => value === solution[index]);
    if (isSolution) {
      setTimeout(() => {
        Alert.alert('Gratulacje!', 'Udało Ci się ułożyć płytki! Resetowanie planszy...');
        setBoard(initialBoard);
      }, 200);
    }
  }, [board]);

  const images = {
    1: require('@/assets/images/space/4x4/2.jpg'),
    2: require('@/assets/images/space/4x4/3.jpg'),
    3: require('@/assets/images/space/4x4/4.jpg'),
    4: require('@/assets/images/space/4x4/5.jpg'),
    5: require('@/assets/images/space/4x4/6.jpg'),
    6: require('@/assets/images/space/4x4/7.jpg'),
    7: require('@/assets/images/space/4x4/8.jpg'),
    8: require('@/assets/images/space/4x4/9.jpg'),
    9: require('@/assets/images/space/4x4/10.jpg'),
    10: require('@/assets/images/space/4x4/11.jpg'),
    11: require('@/assets/images/space/4x4/12.jpg'),
    12: require('@/assets/images/space/4x4/13.jpg'),
    13: require('@/assets/images/space/4x4/14.jpg'),
    14: require('@/assets/images/space/4x4/15.jpg'),
    15: require('@/assets/images/space/4x4/16.jpg'),
  };

  const imagesNature = {
    1: require('@/assets/images/nature/4x4/2.jpg'),
    2: require('@/assets/images/nature/4x4/3.jpg'),
    3: require('@/assets/images/nature/4x4/4.jpg'),
    4: require('@/assets/images/nature/4x4/5.jpg'),
    5: require('@/assets/images/nature/4x4/6.jpg'),
    6: require('@/assets/images/nature/4x4/7.jpg'),
    7: require('@/assets/images/nature/4x4/8.jpg'),
    8: require('@/assets/images/nature/4x4/9.jpg'),
    9: require('@/assets/images/nature/4x4/10.jpg'),
    10: require('@/assets/images/nature/4x4/11.jpg'),
    11: require('@/assets/images/nature/4x4/12.jpg'),
    12: require('@/assets/images/nature/4x4/13.jpg'),
    13: require('@/assets/images/nature/4x4/14.jpg'),
    14: require('@/assets/images/nature/4x4/15.jpg'),
    15: require('@/assets/images/nature/4x4/16.jpg'),
  };


  const renderTile = (value, index) => {
    if (value === 0) {
      return null; // Pusty kafelek (0) nie ma zawartości
    }

    if (props.showImages && images[value]) {
      return (
        <Image 
          source={colorScheme === 'space' 
            ? images[value]
            : imagesNature[value]}
          style={styles.tileImage}
          resizeMode="contain"
        />
      );
    }

    return <Text style={styles.tileText}>{value}</Text>;
  };

  return (
    <View style={styles.container}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tile, value === 0 && styles.zeroTile]}
          onPress={() => handlePress(index)}
        >
          {renderTile(value, index)}
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
  tileImage: {
    width: '100%',
    height: '100%',
  },
});
export default Board4x4;