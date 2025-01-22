import React, { useContext, useState, } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import Board4x4 from '@/components/Board4x4'

const Play4x4 = () => {
    const { colorScheme, theme } = useContext(ThemeContext);
    const styles = createStyles(theme, colorScheme);
    const [showImages, setShowImages] = useState(true);

    const toggleTiles = () => {
        setShowImages(!showImages);
    };

    return (
        <ImageBackground
            source={colorScheme === 'space'
                ? require('@/assets/images/space/space-menu-background.jpg')
                : require('@/assets/images/nature/nature-menu-background.jpg')}
            style={styles.backgroundImage}
        >
            <Image
                source={require('@/assets/images/title.png')}
                style={styles.logo}
            />
            <View style={styles.gameArea}>
                <Board4x4 showImages={showImages} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Back to Menu')}>
                    <Text style={styles.buttonText}>Back to Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleTiles}>
                    <Text style={styles.buttonText}>Toggle Tiles</Text>
                </TouchableOpacity>
            </View>
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
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        logo: {
            width: 220,
            height: 80,
            resizeMode: 'contain',
            marginTop: 20,
        },
        gameArea: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '98%',
            aspectRatio: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginTop: 20,
            marginBottom: 20,
            padding: '3%',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            position: 'absolute',
            bottom: 20,
        },
        button: {
            backgroundColor: theme.buttonBackground,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.buttonBorder,
        },
        buttonText: {
            color: theme.textColor,
            fontSize: 18,
        },
    });
}

export default Play4x4;