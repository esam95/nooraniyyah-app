import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TargetLetterProps {
  targetLetter: string;
}

export default function TargetLetter({ targetLetter }: TargetLetterProps) {
  return ( 
    <View style={styles.targetLetterContainer}>
      <Text style={styles.targetLetterText}>{targetLetter}</Text>
    </View>  
  );
}

const styles = StyleSheet.create({
  targetLetterContainer: {
    backgroundColor: '#FF9800', // Vibrant orange
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  targetLetterText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
});