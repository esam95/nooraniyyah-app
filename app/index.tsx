import GameSection from "@/components/GameSection";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.letter}>
        <Text>Letter</Text>
      </View>
      <View style={styles.gameSection}>
        <GameSection/>
      </View>
      <View style={styles.counter}>
        <Text>Counter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  letter: {
    flex: 1,
    backgroundColor: 'yellow',
    borderWidth: 1,
  },
  gameSection: {
    flex: 5,
  },
  counter: {
    flex: 1,
    backgroundColor: 'pink',
    borderWidth: 1
  },
});
