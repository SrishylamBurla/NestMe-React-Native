import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const ChatBubble = ({ message }) => {
  const isUser = message.senderRole === "user";

  const time = new Date(
    message.createdAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={[
        styles.row,
        isUser
          ? styles.userRow
          : styles.adminRow,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser
            ? styles.userBubble
            : styles.adminBubble,
        ]}
      >
        {!isUser && (
          <Text style={styles.adminLabel}>
            NestMe Support
          </Text>
        )}

        <Text
          style={[
            styles.message,
            isUser
              ? styles.userText
              : styles.adminText,
          ]}
        >
          {message.message}
        </Text>

        <View style={styles.footer}>
          <Text
            style={[
              styles.time,
              isUser
                ? styles.userTime
                : styles.adminTime,
            ]}
          >
            {time}
          </Text>

          {isUser && (
            <Text style={styles.status}>
              {message.isRead ? "✓✓" : "✓"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
    flexDirection: "row",
  },

  userRow: {
    justifyContent: "flex-start",
  },

  adminRow: {
    justifyContent: "flex-end",
  },

  bubble: {
    maxWidth: "82%",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  userBubble: {
    backgroundColor: "#5B3DF5",
    borderBottomRightRadius: 6,
    shadowColor: "#5B3DF5",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  adminBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  adminLabel: {
    fontSize: 12,
    fontWeight: "700",

    color: "#5B3DF5",

    marginBottom: 6,
  },

  message: {
    fontSize: 15,
    lineHeight: 22,
  },

  userText: {
    color: "#FFFFFF",
  },

  adminText: {
    color: "#111827",
  },

  footer: {
    marginTop: 10,

    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  time: {
    fontSize: 11,
  },
  userTime: {
    color: "rgba(255,255,255,0.75)",
  },
  adminTime: {
    color: "#94A3B8",
  },
  status: {
    marginLeft: 6,
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});