import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import MoodButton from "./MoodButton";

const MOODS = [
  { key: "happy", emoji: "😊", label: "Happy", color: "#FFD670" },
  { key: "sad", emoji: "😢", label: "Sad", color: "#8EC5FC" },
  { key: "tired", emoji: "😴", label: "Tired", color: "#C3B1E1" },
  { key: "excited", emoji: "🤩", label: "Excited", color: "#FF9AA2" },
];

const INITIAL_COUNTS = { happy: 0, sad: 0, tired: 0, excited: 0 };

export default function App() {
  const [counts, setCounts] = useState(INITIAL_COUNTS);

  const logMood = (key) => {
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const reset = () => setCounts({ ...INITIAL_COUNTS });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...Object.values(counts));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>Mood Tracker</Text>
      <Text style={styles.subtitle}>How are you feeling right now?</Text>

      <View style={styles.buttonRow}>
        {MOODS.map((mood) => (
          <MoodButton
            key={mood.key}
            emoji={mood.emoji}
            label={mood.label}
            color={mood.color}
            onPress={() => logMood(mood.key)}
          />
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Your moods</Text>
          <Text style={styles.total}>{total} logged</Text>
        </View>

        {total === 0 && (
          <Text style={styles.empty}>Tap a mood above to get started ✨</Text>
        )}

        {MOODS.map((mood) => {
          const count = counts[mood.key];
          const isTop = maxCount > 0 && count === maxCount;
          const pct = total === 0 ? 0 : (count / total) * 100;

          return (
            <View key={mood.key} style={styles.row}>
              <Text style={styles.rowEmoji}>{mood.emoji}</Text>
              <View style={styles.rowMain}>
                <View style={styles.rowTop}>
                  <Text style={[styles.rowLabel, isTop && styles.topLabel]}>
                    {mood.label} {isTop ? "👑" : ""}
                  </Text>
                  <Text
                    style={[
                      styles.rowCount,
                      isTop && { color: mood.color, fontSize: 24 },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${pct}%`, backgroundColor: mood.color },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Pressable
        onPress={reset}
        style={({ pressed }) => [styles.resetButton, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f3a",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#a9a9cf",
    marginTop: 6,
    marginBottom: 26,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#2d2d52",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  total: {
    fontSize: 14,
    color: "#a9a9cf",
  },
  empty: {
    color: "#a9a9cf",
    textAlign: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  rowEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  rowMain: {
    flex: 1,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  rowLabel: {
    fontSize: 16,
    color: "#d6d6f0",
  },
  topLabel: {
    color: "#ffffff",
    fontWeight: "700",
  },
  rowCount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1f1f3a",
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  resetButton: {
    borderWidth: 1.5,
    borderColor: "#ff6b81",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  resetText: {
    color: "#ff6b81",
    fontSize: 16,
    fontWeight: "700",
  },
});