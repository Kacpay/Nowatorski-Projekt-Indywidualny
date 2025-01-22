import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import { ThemeContext } from '@/context/ThemeContext';

const Board5x5 = (props) => {
  const { colorScheme } = useContext(ThemeContext);

  let initialBoard = [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [board, setBoard] = useState(initialBoard);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [playerName, setPlayerName] = useState('');

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    setStartTime(Date.now());
    initialBoard = shuffleArray(initialBoard)
  }, []);
  

  const resetBoard = () => {
    setBoard(shuffleArray(initialBoard));
    setStartTime(Date.now());
    setPlayerName('');
  };

  const saveScore = async (name, time, type) => {
    try {
      const newScore = { name, time, type };
      const storedScores = await AsyncStorage.getItem('scores');
      const updatedScores = storedScores ? JSON.parse(storedScores) : [];
      updatedScores.push(newScore);
      await AsyncStorage.setItem('scores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Błąd podczas zapisywania wyniku:', error);
    }
  };

  const isNeighbor = (index1, index2) => {
    const row1 = Math.floor(index1 / 5);
    const col1 = index1 % 5;
    const row2 = Math.floor(index2 / 5);
    const col2 = index2 % 5;

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  const handlePress = (index) => {
    const zeroIndex = board.indexOf(0);
    if (isNeighbor(index, zeroIndex)) {
      const newBoard = [...board];
      [newBoard[zeroIndex], newBoard[index]] = [newBoard[index], newBoard[zeroIndex]];
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    const isSolution = board.every((value, index) => value === solution[index]);
    if (isSolution) {
      const endTime = Date.now();
      const timeTaken = Math.round((endTime - startTime) / 1000);
      setElapsedTime(timeTaken);
      setDialogVisible(true);
    }
  }, [board]);

  const handleDialogSubmit = () => {
    if (playerName.trim()) {
      saveScore(playerName, elapsedTime, '5x5');
      setDialogVisible(false);
      resetBoard();
    } else {
      Alert.alert('Attention', 'Please enter your name before saving the score.');
    }
  };

  const handleDialogCancel = () => {
    setDialogVisible(false);
    resetBoard();
  };

  const images = {
    1: require('@/assets/images/space/5x5/2.jpg'),
    2: require('@/assets/images/space/5x5/3.jpg'),
    3: require('@/assets/images/space/5x5/4.jpg'),
    4: require('@/assets/images/space/5x5/5.jpg'),
    5: require('@/assets/images/space/5x5/6.jpg'),
    6: require('@/assets/images/space/5x5/7.jpg'),
    7: require('@/assets/images/space/5x5/8.jpg'),
    8: require('@/assets/images/space/5x5/9.jpg'),
    9: require('@/assets/images/space/5x5/10.jpg'),
    10: require('@/assets/images/space/5x5/11.jpg'),
    11: require('@/assets/images/space/5x5/12.jpg'),
    12: require('@/assets/images/space/5x5/13.jpg'),
    13: require('@/assets/images/space/5x5/14.jpg'),
    14: require('@/assets/images/space/5x5/15.jpg'),
    15: require('@/assets/images/space/5x5/16.jpg'),
    16: require('@/assets/images/space/5x5/17.jpg'),
    17: require('@/assets/images/space/5x5/18.jpg'),
    18: require('@/assets/images/space/5x5/19.jpg'),
    19: require('@/assets/images/space/5x5/20.jpg'),
    20: require('@/assets/images/space/5x5/21.jpg'),
    21: require('@/assets/images/space/5x5/22.jpg'),
    22: require('@/assets/images/space/5x5/23.jpg'),
    23: require('@/assets/images/space/5x5/24.jpg'),
    24: require('@/assets/images/space/5x5/25.jpg'),
  };

  const imagesNature = {
    1: require('@/assets/images/nature/5x5/2.jpg'),
    2: require('@/assets/images/nature/5x5/3.jpg'),
    3: require('@/assets/images/nature/5x5/4.jpg'),
    4: require('@/assets/images/nature/5x5/5.jpg'),
    5: require('@/assets/images/nature/5x5/6.jpg'),
    6: require('@/assets/images/nature/5x5/7.jpg'),
    7: require('@/assets/images/nature/5x5/8.jpg'),
    8: require('@/assets/images/nature/5x5/9.jpg'),
    9: require('@/assets/images/nature/5x5/10.jpg'),
    10: require('@/assets/images/nature/5x5/11.jpg'),
    11: require('@/assets/images/nature/5x5/12.jpg'),
    12: require('@/assets/images/nature/5x5/13.jpg'),
    13: require('@/assets/images/nature/5x5/14.jpg'),
    14: require('@/assets/images/nature/5x5/15.jpg'),
    15: require('@/assets/images/nature/5x5/16.jpg'),
    16: require('@/assets/images/nature/5x5/17.jpg'),
    17: require('@/assets/images/nature/5x5/18.jpg'),
    18: require('@/assets/images/nature/5x5/19.jpg'),
    19: require('@/assets/images/nature/5x5/20.jpg'),
    20: require('@/assets/images/nature/5x5/21.jpg'),
    21: require('@/assets/images/nature/5x5/22.jpg'),
    22: require('@/assets/images/nature/5x5/23.jpg'),
    23: require('@/assets/images/nature/5x5/24.jpg'),
    24: require('@/assets/images/nature/5x5/25.jpg'),
  };

  const renderTile = (value, index) => {
    if (value === 0) {
      return null;
    }

    if (props.showImages && images[value]) {
      return (
        <Image
          source={colorScheme === 'space' ? images[value] : imagesNature[value]}
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
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Congratulations!</Dialog.Title>
        <Dialog.Description>
          You managed to solve the puzzle in {elapsedTime} seconds. Enter your name to save the score.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Your Name"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <Dialog.Button label="Cancel" onPress={handleDialogCancel} />
        <Dialog.Button label="Save" onPress={handleDialogSubmit} />
      </Dialog.Container>
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
    width: '20%',
    height: '20%',
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

export default Board5x5;
