import React from "react";
import { Text, StyleSheet } from "react-native";

export default function PermissionStatusText({ status }) {
  if (!status) return null;

  const isGranted = status === "granted";

  return (
    <Text
      style={[
        styles.text,
        { color: isGranted ? "green" : "red" },
      ]}
    >
      {isGranted ? "Permiso concedido ✅" : "Permiso denegado ❌"}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
