import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import MoodButton from "./MoodButton";

const MOODS = [
  { key: "happy", emoji: "😊", label: "Happy" },
  { key: "sad", emoji: "😢", label: "Sad" },
  { key: "tired", emoji: "😴", label: "Tired" },
  { key: "excited", emoji: "🤩", label: "Excited" },
];

const INITIAL_COUNTS = { happy: 0, sad: 0, tired: 0, excited: 0 };

export default function App() {
  const [counts, setCounts] = useState(INITIAL_COUNTS);

  // Step 3: return a NEW object with just the chosen mood incremented
  const logMood = (key) => {
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  // Step 5: return a new object with everything back to zero
  const reset = () => setCounts({ ...INITIAL_COUNTS });

  // Bonus: find the highest count (ignore ties at zero)
  const maxCount = Math.max(...Object.values(counts));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>

      <View style={styles.buttonRow}>
        {MOODS.map((mood) => (
          <MoodButton
            key={mood.key}
            emoji={mood.emoji}
            label={mood.label}
            onPress={() => logMood(mood.key)}
          />
        ))}
      </View>

      <View style={styles.counts}>
        {MOODS.map((mood) => {
          const isTop = maxCount > 0 && counts[mood.key] === maxCount;
          return (
            <Text
              key={mood.key}
              style={[styles.countText, isTop && styles.topCount]}
            >
              {mood.emoji} {mood.label}: {counts[mood.key]}
            </Text>
          );
        })}
      </View>

      <Button title="Reset" onPress={reset} color="#d9534f" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  counts: {
    marginBottom: 24,
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    color: "#555",
    marginVertical: 4,
  },
  // Bonus: most-selected mood(s) are bigger and colored
  topCount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e8b57",
  },
});