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
  fallingAnimation: Animated.Value; // Individual animation for each ball
  scaleAnimation: Animated.Value;
  opacityAnimation: Animated.Value;
  left: number; // Horizontal position
  letter: string; // Letter assigned to the ball
}

const BALL_SPEED = 50;
const distanceToTravel = height; // From top (0) to bottom (screen height)
const duration = (distanceToTravel / BALL_SPEED) * 1000; // Time = distance / speed (convert to ms)

export default function GameSection({ targetLetter, score, setScore}: SetScoreProps) {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    // Spawn a new ball every xx seconds
    const interval = setInterval(() => {
      spawnBall();
    }, 4000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const spawnBall = () => {
    const newBall: Ball = {
      id: Date.now(), // Unique ID based on timestamp
      fallingAnimation: new Animated.Value(0), // Start at the top of the screen
      scaleAnimation: new Animated.Value(1),
      opacityAnimation: new Animated.Value(1),
      left: Math.random() * (width - 50), // Random horizontal position
      letter: generateRandomLetter(), // Random letter between A and D
    };

    setBalls((prevBalls) => [...prevBalls, newBall]); // Add new ball to the state
    
    // Animate the ball to fall down
    Animated.timing(newBall.fallingAnimation, {
      toValue: distanceToTravel, // Move to the bottom of the screen
      duration: duration, // Falls over 5 seconds
      useNativeDriver: true,
    }).start(() => {
      // Remove the ball once the animation is complete
      setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== newBall.id));
    });
  };

  const handlePress = (clickedBall: Ball) => {
    if (clickedBall.letter === targetLetter) {
      setScore(score + 5);
      popBall(clickedBall);
    }
  };

  const popBall = (clickedBall: Ball) => {
    Animated.sequence([
      // Scale the ball up to 1.5x size
      Animated.timing(clickedBall.scaleAnimation, {
        toValue: 1.5,
        duration: 100, // Duration for scaling up
        useNativeDriver: true,
      }),
      // Scale the ball back down to 0
      Animated.timing(clickedBall.scaleAnimation, {
        toValue: 0,
        duration: 150, // Duration for shrinking down
        useNativeDriver: true,
      }),
    ]).start(() => {
      setBalls((prevBalls) => prevBalls.filter((ball) => ball.id !== clickedBall.id));
    }
    );
  };

  return (
    <View style={styles.container}>
      {balls.map((ball) => (
        <Animated.View
          key={ball.id}
          style={[
            styles.ball,
            {
              transform: [{ translateY: ball.fallingAnimation }, { scale: ball.scaleAnimation }],
              opacity: ball.opacityAnimation,
              left: ball.left,
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={() => handlePress(ball)}>
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

