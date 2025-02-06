"use server";
import { onCurrentUser } from "../user";
import {
  deleteNotifications,
  getNotifications,
  markAsReadNotifications,
} from "./queries";

export const getNotification = async (cursor?: string) => {
  const user = await onCurrentUser();
  try {
    const notifications = await getNotifications(user.id, cursor);
    if (notifications)
      return {
        status: 200,
        data: notifications,
        nextCursor: notifications.notification[4]?.id || null, // Get the last item's ID as next cursor
      };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
export const deleteNotification = async (notificationId: string) => {
  console.log(notificationId);
  await onCurrentUser();

  try {
    const notifications = await deleteNotifications(notificationId);
    if (notifications) return { status: 200, data: notifications };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
export const markNotificationAsRead = async (notificationId: string) => {
  console.log(notificationId);

  await onCurrentUser();

  try {
    const notifications = await markAsReadNotifications(notificationId);
    if (notifications) return { status: 200, data: notifications };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
