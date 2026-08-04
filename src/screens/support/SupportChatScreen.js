import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SupportHeader from './components/SupportHeader';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';

import {
  useGetSupportTicketQuery,
  useSendSupportMessageMutation,
  useMarkSupportReadMutation,
} from '../../services/supportApi';

export default function SupportChatScreen({ navigation, route }) {
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
  }, [ticketId, markRead]);

  useEffect(() => {
    if (messages.length) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

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

  if (isLoading) {
    return (
      <>
        <StatusBar backgroundColor="#F4F7FC" barStyle="dark-content" />

        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#5B3DF5" />
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#F4F7FC" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <SupportHeader
            title={ticket?.subject || 'Support Ticket'}
            subtitle={ticket?.status || ''}
            showBack
            onBackPress={() => navigation.goBack()}
          />

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              console.log(JSON.stringify(item, null, 2));
              return <ChatBubble message={item} />;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatContent}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          />

          <ChatInput
            value={message}
            onChangeText={setMessage}
            onSend={sendHandler}
            loading={sending}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
  },

  chatContent: {
    padding: 18,
    paddingBottom: 20,
    flexGrow: 1,
  },
});
