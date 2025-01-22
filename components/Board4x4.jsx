import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import { ThemeContext } from '@/context/ThemeContext';

const Board4x4 = (props) => {
  const { colorScheme } = useContext(ThemeContext);

  const initialBoard = [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [board, setBoard] = useState(initialBoard);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

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
      saveScore(playerName, elapsedTime, '4x4');
      setDialogVisible(false);
      setBoard(initialBoard);
      setStartTime(Date.now());
      setPlayerName('');
    } else {
      Alert.alert('Uwaga', 'Podaj swoje imię przed zapisaniem wyniku.');
    }
  };

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
        <Dialog.Title>Gratulacje!</Dialog.Title>
        <Dialog.Description>
          Udało Ci się ułożyć płytki w {elapsedTime} sekund. Podaj swoje imię, aby zapisać wynik.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Twoje imię"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <Dialog.Button label="Anuluj" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Zapisz" onPress={handleDialogSubmit} />
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
