// src/screens/ChatbotScreen.tsx
import React, { useState, useEffect , useRef} from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';
import { sendMessageToGemini } from '../services/geminiChat';
import { useUser } from '../context/UserContext';
import { getPatientData } from '../services/firestorefunctions';
import Markdown from 'react-native-markdown-display';



export default function ChatbotScreen() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const { userInfo, setUserInfo } = useUser();
  const flatListRef = useRef<FlatList>(null);


//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getPatientData();
//         setUserInfo(data);
//         const intro = `
// User: Here is my info:
// • Name: ${data.firstName ?? 'undefined'}
// • Age: ${data.age ?? 'undefined'}
// • Gender: ${data.gender ?? 'undefined'}
// • Condition: ${data.cancerType ?? 'undefined'}
// Let's chat!`;
//         console.log('Sending prompt to Gemini:\n', intro);
//         const reply = await sendMessageToGemini(intro);
//         setMessages([
//           { from: 'user', text: intro },
//           { from: 'bot', text: reply },
//         ]);
//       } catch {
//         setMessages([{ from: 'bot', text: "Hi! I couldn't load your data. Let's still chat!" }]);
//       }
//     })();
//   }, []);

//2nd
// useEffect(() => {
//   (async () => {
//     try {
//       const data = await getPatientData();
//       setUserInfo(data);

//       // Build a bullet‑list of every key/value in userInfo
//       const entries = Object.entries(data) as [string, any][];
//       const bullets = entries.map(([key, val]) => {
//         // Convert arrays & objects to comma‑joined strings
//         const display = Array.isArray(val)
//           ? val.join(', ')
//           : typeof val === 'object' && val !== null
//             ? JSON.stringify(val)
//             : String(val);
//         // Pretty‑print camelCase keys
//         const label = key
//           .replace(/([A-Z])/g, ' $1')     // insert spaces before caps
//           .replace(/^./, str => str.toUpperCase()); // capitalize first letter
//         return `• ${label}: ${display}`;
//       }).join('\n');

//       const intro = `User has provided the following information:\n${bullets}\n\nNow let's chat!`;
      
//       // send to Gemini
//       const reply = await sendMessageToGemini(intro);

//       setMessages([
//         { from: 'user', text: intro },
//         { from: 'bot', text: reply },
//       ]);
//     } catch (e) {
//       console.error(e);
//       setMessages([{ from: 'bot', text: "Hi! Couldn't load your data — let's still chat!" }]);
//     }
//   })();
// }, []);

useEffect(() => {
  (async () => {
    try {
      const data = await getPatientData();
      setUserInfo(data);

      // Format data to send to Gemini (but keep hidden from UI)
      const entries = Object.entries(data) as [string, any][];
      const bullets = entries.map(([key, val]) => {
        const display = Array.isArray(val)
          ? val.join(', ')
          : typeof val === 'object' && val !== null
            ? JSON.stringify(val)
            : String(val);
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        return `• ${label}: ${display}`;
      }).join('\n');

      const intro = `User has provided the following information:\n${bullets}\n\nNow let's chat!`;

      // Send to Gemini
      const reply = await sendMessageToGemini(intro);

      // Only display placeholder, not full intro
      setMessages([
        { from: 'bot', text: "👋 Ray has loaded your health profile. Let's get started!" },
        { from: 'bot', text: reply },
      ]);
    } catch (e) {
      console.error(e);
      setMessages([{ from: 'bot', text: "Hi! Couldn't load your data — let's still chat!" }]);
    }
  })();
}, []);


  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user' as const, text: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');

    // const convo = updated
    //   .map(m => `${m.from === 'user' ? 'User' : 'Ray'}: ${m.text}`)
    //   .join('\n') + '\nRay:';
    const convo = updated.map(m => m.text).join('\n');
    const botReply = await sendMessageToGemini(convo);
    setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* <FlatList
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              {
                alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === 'user' ? theme.colors.secondary : '#eee',
              },
            ]}
          >
            {item.from === 'bot' ? (
              <Markdown style={{ body: { color: '#000', fontSize: 16 } }}>
                {item.text}
              </Markdown>
            ) : (
              <Text style={{ color: '#000' }}>{item.text}</Text>
            )}
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
      /> */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              {
                alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === 'user' ? theme.colors.secondary : '#eee',
              },
            ]}
          >
            {item.from === 'bot' ? (
              <Markdown style={{ body: { color: '#000', fontSize: 16 } }}>
                {item.text}
              </Markdown>
            ) : (
              <Text style={{ color: '#000' }}>{item.text}</Text>
            )}
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { color: '#000' }]}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bubble: { padding: 12, marginVertical: 6, borderRadius: 12, maxWidth: '80%' },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12 },
  sendBtn: { marginLeft: 8, backgroundColor: '#6200ee', borderRadius: 20, padding: 12, justifyContent: 'center' },
});
