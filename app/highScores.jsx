import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '@/context/ThemeContext';
import { useRouter } from "expo-router";

const HighScores = () => {
    const { colorScheme, theme } = useContext(ThemeContext);
    const router = useRouter();

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const storedScores = await AsyncStorage.getItem('scores');
                const parsedScores = storedScores ? JSON.parse(storedScores) : [];
                const sortedScores = parsedScores.sort((a, b) => a.time - b.time);
                setScores(sortedScores);
            } catch (error) {
                console.error('Błąd podczas odczytu wyników:', error);
            }
        };

        fetchScores();
    }, []);

    const styles = createStyles(theme, colorScheme);

    return (
        <ImageBackground
            source={colorScheme === 'space'
                ? require('@/assets/images/space/space-menu-background.jpg')
                : require('@/assets/images/nature/nature-menu-background.jpg')}
            style={styles.backgroundImage}
        >
            <Image
                source={require('@/assets/images/high-scores.png')}
                style={styles.titleImage}
            />
            <ScrollView style={styles.scoresContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Time</Text>
                    <Text style={styles.headerText}>Game Size</Text>
                </View>
                {scores.length > 0 ? (
                    scores.map((score, index) => (
                        <View key={index} style={styles.scoreRow}>
                            <Text style={styles.scoreItem}>{score.name}</Text>
                            <Text style={styles.scoreItem}>{score.time}s</Text>
                            <Text style={styles.scoreItem}>{score.type}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noScoresText}>Brak wyników do wyświetlenia.</Text>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

function createStyles(theme, colorScheme) {
    const { height } = Dimensions.get('window');
    const scrollViewHeight = height - 250;

    return StyleSheet.create({
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titleImage: {
            width: 250,
            height: 100,
            resizeMode: 'contain',
            marginTop: 50,
        },
        scoresContainer: {
            backgroundColor: 'rgba(0,0,0,0.35)',
            width: '70%',
            maxHeight: scrollViewHeight,
            marginTop: 20,
            borderRadius: 10,
            padding: 10,
        },
        scrollContent: {
            paddingBottom: 10,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: theme.textColor,
            paddingBottom: 5,
        },
        headerText: {
            color: theme.textColor,
            fontSize: 18,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
        },
        scoreRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
        },
        scoreItem: {
            color: theme.textColor,
            fontSize: 16,
            flex: 1,
            textAlign: 'center',
        },
        noScoresText: {
            color: theme.textColor,
            fontSize: 18,
            textAlign: 'center',
        },
        backButton: {
            position: 'absolute',
            bottom: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.buttonBackground,
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

export default HighScores;
