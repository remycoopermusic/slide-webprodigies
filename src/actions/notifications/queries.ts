"use server";
import { client } from "@/lib/prisma";

export const getNotifications = async (clerkId: string, cursor?: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      notification: {
        take: 5,
        ...(cursor && {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }),
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};
export const deleteNotifications = async (notificationId: string) => {
  return await client.notification.delete({
    where: {
      id: notificationId,
    },
  });
};
export const markAsReadNotifications = async (notificationId: string) => {
  return await client.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isSeen: true,
    },
  });
};
