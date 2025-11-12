import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

// 🔹 Solicitar permisos y obtener token (ajustado para pruebas locales)
export async function registerForPushNotificationsAsync() {
  let token = null;
  let status;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      finalStatus = newStatus;
    }

    status = finalStatus;

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "No podrás recibir notificaciones. Por favor, habilita los permisos desde la configuración."
      );
      return { status: "denied" };
    }

    // 👇 Evita pedir el token real (ya no funciona en Expo Go)
    try {
      const pushToken = await Notifications.getExpoPushTokenAsync();
      token = pushToken.data || "Token no disponible en Expo Go (solo local)";
    } catch (e) {
      token = "Token no disponible en Expo Go (solo local)";
    }

    console.log("Token:", token);
  } else {
    Alert.alert("Atención", "Debes usar un dispositivo físico para notificaciones.");
    status = "denied";
  }

  return { token, status };
}


// 🔹 Programar una notificación local
export async function scheduleNotification() {
  const triggerSeconds = 5;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📢 Notificación programada",
      body: "Esta es una prueba de notificación local.",
    },
    trigger: { seconds: triggerSeconds },
  });

  // Calcular la hora exacta de la próxima notificación
  const date = new Date(Date.now() + triggerSeconds * 1000);
  const formattedTime = date.toLocaleTimeString();

  return formattedTime;
}
