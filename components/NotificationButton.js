import React from "react";
import { Button, View, StyleSheet } from "react-native";

export default function NotificationButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Programar notificación (5s)" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});
