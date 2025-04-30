import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Button } from "react-native";

export default function VoiceNoteItem({ item, onPress, onDelete }) {
  return (
    <View style={styles.noteContainer}>
      <TouchableOpacity onPress={onPress} style={styles.noteText}>
        <Text>📝 {item.timestamp}</Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  noteText: {
    flex: 1,
  },
});
