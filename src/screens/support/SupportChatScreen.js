import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import SupportHeader from './components/SupportHeader';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';

import {
  useGetSupportTicketQuery,
  useSendSupportMessageMutation,
  useMarkSupportReadMutation,
} from '../../services/supportApi';

const SupportChatScreen = ({ navigation, route }) => {
  const { ticketId } = route.params;

  const flatListRef = useRef(null);

  const [message, setMessage] = useState('');

  const { data, isLoading, isFetching, refetch } =
    useGetSupportTicketQuery(ticketId);

  const [sendMessage, { isLoading: sending }] = useSendSupportMessageMutation();

  const [markRead] = useMarkSupportReadMutation();

  const ticket = data?.ticket;

  const messages = data?.messages || [];

  useEffect(() => {
    markRead(ticketId);
  }, [ticketId]);

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      }, 100);
    }
  }, [messages]);

  // useFocusEffect(
  //     useCallback(() => {
  //         refetch();
  //     }, [refetch])
  // );

  const sendHandler = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        id: ticketId,
        message,
      }).unwrap();

      setMessage('');

    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading || isFetching) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#5B3DF5" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <SupportHeader
          title={ticket?.subject || 'Support Ticket'}
          subtitle={ticket?.status || ''}
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={{
              padding: 18,
              paddingBottom: 20,
            }}
            onRefresh={refetch}
            refreshing={false}
            showsVerticalScrollIndicator={false}
          />

          <ChatInput
            value={message}
            onChangeText={setMessage}
            onSend={sendHandler}
            loading={sending}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SupportChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
