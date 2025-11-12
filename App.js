import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync, scheduleNotification } from "./utils/notifications";
import PermissionStatusText from "./components/PermissionStatusText";
import NotificationButton from "./components/NotificationButton";

// 🟢 Manejador global de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [token, setToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [nextNotificationTime, setNextNotificationTime] = useState(null);

  // Solicita permisos al iniciar
  useEffect(() => {
    requestPermission();
  }, []);

  // 🔹 Función para solicitar permiso y obtener token
  const requestPermission = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result?.status) {
      setPermissionStatus(result.status);
      if (result.token) setToken(result.token);
    } else {
      setPermissionStatus("denied");
    }
  };

  // 🔹 Maneja programación de notificación
  const handleScheduleNotification = async () => {
    const time = await scheduleNotification();
    setNextNotificationTime(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token de dispositivo:</Text>
      <Text selectable>{token || "Solicitando permiso..."}</Text>

      {/* Estado del permiso */}
      <PermissionStatusText status={permissionStatus} />

      {/* Botones */}
      <NotificationButton onPress={handleScheduleNotification} />
      <Button title="Solicitar permiso nuevamente" onPress={requestPermission} />

      {/* Hora de próxima notificación */}
      {nextNotificationTime && (
        <Text style={styles.timeText}>
          Próxima notificación: {nextNotificationTime}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeText: {
    marginTop: 15,
    fontSize: 14,
    color: "gray",
  },
});
