import { Pressable, Text, StyleSheet } from "react-native";

// Props:
//   emoji   - e.g. "😊"
//   label   - e.g. "Happy"
//   color   - accent color for the button (optional)
//   onPress - called when the button is tapped
export default function MoodButton({ emoji, label, color = "#ffffff", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 96,
    height: 104,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.92 }],
  },
  emoji: {
    fontSize: 40,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: "#1f1f3a",
    fontWeight: "700",
  },
});