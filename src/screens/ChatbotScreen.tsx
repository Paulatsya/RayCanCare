import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { sendMessageToGemini } from '../services/geminiChat';
import { getPatientData } from '../services/firestorefunctions';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState<any>(null);

  const firstMessageSent = useRef(false);

  // 🔹 Fetch patient info when screen loads
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const data = await getPatientData();
        console.log('Patient data:', data);
        setPatientInfo(data); // Save patient info for context

        const intro = `**Name:** ${data.name || "undefined"}\n**Age:** ${data.age || "undefined"}\n**Gender:** ${data.gender || "Prefer not to say"}\n**Condition:** ${data.condition || "undefined"}`;

        setMessages([
          {
            from: 'bot',
            text: `Based on the information you have provided, here is what I know about you:\n\n${intro}\n\nIn short, I don't know any personal information about you.`,
          },
        ]);
      } catch (e) {
        console.error('Error fetching user data:', e);
        setMessages([
          {
            from: 'bot',
            text: `Hi! I couldn't load your data. Let's still chat!`,
          },
        ]);
      }
    };

    fetchIntro();
  }, []);

  // 🔹 Send Message
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let promptToSend = input;

      // Append patient info only in first message
      if (!firstMessageSent.current && patientInfo) {
        promptToSend = `
Patient Information:
- Name: ${patientInfo.name}
- Age: ${patientInfo.age}
- Gender: ${patientInfo.gender}
- Condition: ${patientInfo.condition}

Now answer this:
${input}`;
        firstMessageSent.current = true;
      }

      const botReply = await sendMessageToGemini(promptToSend);
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat} contentContainerStyle={{ padding: 10 }}>
        {messages.map((msg, idx) => (
          <Text
            key={idx}
            style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              marginVertical: 2,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{msg.from === 'user' ? 'You: ' : 'Ray: '}</Text>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          editable={!loading}
        />
        <Button title="Send" onPress={handleSend} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chat: { flex: 1 },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});

export default ChatbotScreen;
