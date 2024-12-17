import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>  );
}

const styles = StyleSheet.create({
scoreContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
scoreText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#B71C1C', // Deep red for the score
},
});