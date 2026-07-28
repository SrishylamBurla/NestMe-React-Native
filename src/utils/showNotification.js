import notifee, { AndroidImportance } from '@notifee/react-native';

let channelCreated = false;

export async function showNotification(title, body) {
  if (!channelCreated) {
    await notifee.createChannel({
      id: 'default',
      name: 'NestMe Notifications',
      importance: AndroidImportance.HIGH,
    });

    channelCreated = true;
  }

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
      smallIcon: 'ic_launcher',
    },
  });
}