import React, { useState, useRef } from 'react';
import GameSection from "@/components/GameSection";
import { StyleSheet, Text, View } from "react-native";
import { generateRandomLetter } from '@/functions/GenerateRandomLetter';
import TargetLetter from '@/components/TargetLetter';
import Score from '@/components/Score';

export default function Index() {
  const targetLetter = useRef<string>(generateRandomLetter());
  const [score, setScore] = useState<number>(0);
  
  return (
    <View style={styles.container}>
      {/* Target Letter Section */}
      <View style={styles.targetSection}>
        <TargetLetter targetLetter={targetLetter.current} />
      </View>

      {/* Game Section */}
      <View style={styles.gameSection}>
        <GameSection targetLetter={targetLetter.current} score={score} setScore={setScore} />
      </View>

      {/* Score Section */}
      <View style={styles.scoreSection}>
        <Score score={score} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2D2E32', // Dark theme background
  },
  targetSection: {
    flex: 1,
    backgroundColor: '#FFD700', // Bright gold background
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#FFC107', // Lighter yellow border
  },
  gameSection: {
    flex: 5,
    backgroundColor: '#2D2E32', // Keep game section dark
  },
  scoreSection: {
    flex: 1,
    backgroundColor: '#FFCDD2', // Light pink
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: '#E57373', // Light red border
  },
});
