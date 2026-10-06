import { Pressable, Text, StyleSheet } from "react-native";

// Props:
//   emoji   - e.g. "😊"
//   label   - e.g. "Happy"
//   onPress - function called when the button is tapped (added in Step 3)
export default function MoodButton({ emoji, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    margin: 6,
    minWidth: 80,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  emoji: {
    fontSize: 36,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },
});