import React, { useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { useRouter } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';

const MainMenu = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const router = useRouter()
  const toggleTheme = () => {
    setColorScheme(colorScheme === 'space' ? 'nature' : 'space');
  };

  const styles = createStyles(theme, colorScheme);

  return (
    <ImageBackground 
      source={colorScheme === 'space' 
        ? require('@/assets/images/space/space-menu-background.jpg') 
        : require('@/assets/images/nature/nature-menu-background.jpg')} 
      style={styles.container}
    >
      <Image 
        source={require('@/assets/images/title.png')} 
        style={styles.titleImage}
      />
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/play4x4')}>
          <Text style={styles.buttonText}>Play 4x4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/play5x5')}>
          <Text style={styles.buttonText}>Play 5x5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/highScores')}>
          <Text style={styles.buttonText}>High Scores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/exit')}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Ionicons name={colorScheme === 'space' ? "flower-outline" : "planet"} size={60} color={theme.textColor} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    titleImage: {
      width: 300,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 30,
      marginTop: 50,
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.buttonBackground,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.buttonBorder,
      width: '40%',
    },
    buttonText: {
      color: theme.textColor,
      textAlign: 'center',
      fontSize: 18,
    },
    themeButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      padding: 5,
      backgroundColor: theme.buttonBackground,
      borderRadius: 20,
    },
    iconButton: {}
  });
}

export default MainMenu;