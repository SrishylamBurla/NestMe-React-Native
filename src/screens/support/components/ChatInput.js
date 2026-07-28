// import React, { useRef } from "react";
// import {
//   ActivityIndicator,
//   Animated,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import Ionicons from "@react-native-vector-icons/ionicons";

// const ChatInput = ({
//   value,
//   onChangeText,
//   onSend,
//   loading = false,
//   disabled = false,
//   onAttachmentPress,
//   onVoicePress,
//   onEmojiPress,
// }) => {
//   const scale = useRef(new Animated.Value(1)).current;

//   const hasText = value.trim().length > 0;

//   const animate = (toValue) => {
//     Animated.spring(scale, {
//       toValue,
//       useNativeDriver: true,
//       speed: 30,
//       bounciness: 8,
//     }).start();
//   };

//   const handleSend = () => {
//     animate(0.9);

//     setTimeout(() => {
//       animate(1);
//       onSend?.();
//     }, 80);
//   };

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>
//         {/* Emoji */}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.iconButton}
//           onPress={onEmojiPress}
//         >
//           <Ionicons
//             name="happy-outline"
//             size={23}
//             color="#64748B"
//           />
//         </TouchableOpacity>

//         {/* Message */}

//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           multiline
//           maxLength={1000}
//           placeholder="Message..."
//           placeholderTextColor="#94A3B8"
//           textAlignVertical="top"
//           style={styles.input}
//         />

//         {/* Attachment */}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.iconButton}
//           onPress={onAttachmentPress}
//         >
//           <Ionicons
//             name="attach"
//             size={22}
//             color="#64748B"
//           />
//         </TouchableOpacity>

//         {/* Send / Voice */}

//         <Animated.View
//           style={{
//             transform: [{ scale }],
//           }}
//         >
//           <TouchableOpacity
//             activeOpacity={0.9}
//             disabled={loading || disabled}
//             style={styles.sendButton}
//             onPress={
//               hasText
//                 ? handleSend
//                 : onVoicePress
//             }
//           >
//             {loading ? (
//               <ActivityIndicator
//                 color="#FFF"
//               />
//             ) : (
//               <Ionicons
//                 name={
//                   hasText
//                     ? "send"
//                     : "mic"
//                 }
//                 size={20}
//                 color="#FFF"
//               />
//             )}
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </View>
//   );
// };

// export default ChatInput;

// const styles = StyleSheet.create({
//   wrapper: {
//     paddingHorizontal: 14,
//     paddingTop: 8,
//     paddingBottom: 18,

//     backgroundColor: "#F4F7FC",
//     borderTopWidth: 1,
//     borderTopColor: "#E2E8F0",
//   },

//   container: {
//     flexDirection: "row",
//     alignItems: "flex-end",

//     backgroundColor: "#FFFFFF",

//     borderRadius: 30,

//     borderWidth: 1,
//     borderColor: "#E2E8F0",

//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingVertical: 8,

//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 10,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },

//     elevation: 5,
//   },

//   input: {
//     flex: 1,

//     minHeight: 42,
//     maxHeight: 130,

//     paddingHorizontal: 10,
//     paddingVertical: 10,

//     color: "#111827",

//     fontSize: 15,

//     lineHeight: 22,
//   },

//   iconButton: {
//     width: 40,
//     height: 40,

//     justifyContent: "center",
//     alignItems: "center",
//   },

//   sendButton: {
//     width: 46,
//     height: 46,

//     borderRadius: 23,

//     backgroundColor: "#5B3DF5",

//     justifyContent: "center",
//     alignItems: "center",

//     shadowColor: "#5B3DF5",
//     shadowOpacity: 0.35,
//     shadowRadius: 8,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },

//     elevation: 6,
//   },
// });


import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

const ChatInput = ({
  value = "",
  onChangeText,
  onSend,
  loading = false,
  disabled = false,
  autoFocus = false,
  placeholder = "Message...",
  onAttachmentPress,
  onVoicePress,
  onEmojiPress,
}) => {
  const inputRef = useRef(null);
  const scale = useRef(new Animated.Value(1)).current;

  const hasText = value.trim().length > 0;

  const animate = (toValue) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  

  const handleSend = () => {
    if (!hasText || loading || disabled) return;

    animate(0.9);

    setTimeout(() => {
      animate(1);
      onSend?.(value.trim());
    }, 80);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconButton}
          onPress={onEmojiPress}
        >
          <Ionicons
            name="happy-outline"
            size={23}
            color="#64748B"
          />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          multiline
          maxLength={1000}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          textAlignVertical="top"
          style={styles.input}
          editable={!loading && !disabled}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={handleSend}
        />

        {hasText ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onChangeText("")}
          >
            <Ionicons
              name="close-circle"
              size={22}
              color="#94A3B8"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconButton}
            onPress={onAttachmentPress}
          >
            <Ionicons
              name="attach"
              size={22}
              color="#64748B"
            />
          </TouchableOpacity>
        )}

        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={loading || disabled}
            style={[
              styles.sendButton,
              !hasText && styles.micButton,
            ]}
            onPress={
              hasText
                ? handleSend
                : onVoicePress
            }
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Ionicons
                name={hasText ? "send" : "mic"}
                size={20}
                color="#FFF"
              />
            )}
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 18,
    backgroundColor: "#F4F7FC",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#FFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 130,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 15,
    lineHeight: 22,
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#5B3DF5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B3DF5",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 6,
  },

  micButton: {
    backgroundColor: "#5B3DF5",
  },
});