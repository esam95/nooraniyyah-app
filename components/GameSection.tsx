import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { generateRandomLetter } from '@/functions/GenerateRandomLetter';
const { width, height } = Dimensions.get('window');

interface SetScoreProps {
  targetLetter: string;
  score: number;
  setScore: (score: number) => void;
}
interface Ball {
  id: number; // Unique identifier for each ball
  animation: Animated.Value; // Individual animation for each ball
  left: number; // Horizontal position
  letter: string; // Letter assigned to the ball
}


const BALL_SPEED = 50;

export default function GameSection({ targetLetter, score, setScore}: SetScoreProps) {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    // Spawn a new ball every 1 second
    const interval = setInterval(() => {
      spawnBall();
    }, 4000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const spawnBall = () => {
    const newBall: Ball = {
      id: Date.now(), // Unique ID based on timestamp
      animation: new Animated.Value(0), // Start at the top of the screen
      left: Math.random() * (width - 50), // Random horizontal position
      letter: generateRandomLetter(), // Random letter between A and D
    };

    setBalls((prevBalls) => [...prevBalls, newBall]); // Add new ball to the state
    const distanceToTravel = height; // From top (0) to bottom (screen height)
    const duration = (distanceToTravel / BALL_SPEED) * 1000; // Time = distance / speed (convert to ms)

    // Animate the ball to fall down
    Animated.timing(newBall.animation, {
      toValue: distanceToTravel, // Move to the bottom of the screen
      duration: duration, // Falls over 5 seconds
      useNativeDriver: true,
    }).start(() => {
      // Remove the ball once the animation is complete
      setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== newBall.id));
    });
  };

  const handlePress = (letter: string, id:number) => {
    if (letter === targetLetter) {
      setScore(score + 5);
      setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== id));
    }
  };

  const removeBall = (id: number) => {
    setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== id));
  };

  return (
    <View style={styles.container}>
      {balls.map((ball) => (
        <Animated.View
          key={ball.id}
          style={[
            styles.ball,
            {
              transform: [{ translateY: ball.animation }],
              left: ball.left, // Horizontal position
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={() => handlePress(ball.letter, ball.id)}>
            <View style={styles.ballInner}>
              <Text style={styles.letter}>{ball.letter}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  ball: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballInner: {
    backgroundColor: 'orange',
    borderRadius: 25,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

