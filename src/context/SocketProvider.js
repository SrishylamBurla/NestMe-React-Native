import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { useGetMeQuery } from "../services/authApi";
import { notificationApi } from "../services/notificationApi";

const SOCKET_URL =
  __DEV__
    ? "http://192.168.0.4:3000"
    : "https://www.nestme.in";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { data } = useGetMeQuery();
  const user = data?.user;

  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("👤 Current User:", user);

    if (!user?._id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Prevent duplicate connections
    if (socket?.connected) return;

    console.log("🔌 Connecting to:", SOCKET_URL);

    const socketInstance = io(SOCKET_URL, {
      transports: ["polling", "websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("🟢 Socket Connected:", socketInstance.id);

      socketInstance.emit("join", user._id);
      console.log("✅ Joined Room:", user._id);
    });

    socketInstance.on("notification", (notification) => {
      console.log("🔔 Notification:", notification);

      dispatch(
        notificationApi.util.updateQueryData(
          "getNotifications",
          undefined,
          (draft) => {
            draft.unshift(notification);
          }
        )
      );

      Toast.show({
        type: "success",
        text1: notification.title,
        text2: notification.message,
      });
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔴 Socket Disconnected:", reason);
    });

    socketInstance.on("connect_error", (err) => {
      console.log("❌ Socket Connect Error:", err.message);
    });

    socketInstance.io.on("reconnect_attempt", () => {
      console.log("🔄 Reconnecting...");
    });

    socketInstance.io.on("reconnect", () => {
      console.log("✅ Reconnected");
    });

    return () => {
      console.log("🛑 Cleaning up socket");

      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}