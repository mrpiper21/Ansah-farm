import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    FlatList,
    Image
  } from 'react-native'
  import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors';
  
  const ChatScreen = () => {
        const [messages, setMessages] = useState([
            {
                id: "1",
                text: "Hello! I need 10kg of fresh tomatoes",
                sender: "client",
                time: "10:00 AM",
            },
            {
                id: "2",
                text: "Hi there! I have organic tomatoes available",
                sender: "farmer",
                time: "10:02 AM",
            },
            {
                id: "3",
                text: "Great! What's your price per kg?",
                sender: "client",
                time: "10:03 AM",
            },
            {
                id: "4",
                text: "$2.50 per kg, harvested this morning",
                sender: "farmer",
                time: "10:05 AM",
            },
        ]);
        const [newMessage, setNewMessage] = useState("");

        const handleSend = () => {
            if (newMessage.trim()) {
                const newMsg = {
                    id: (messages.length + 1).toString(),
                    text: newMessage,
                    sender: "client", // Assuming current user is client
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
                setMessages([...messages, newMsg]);
                setNewMessage("");
            }
        };

        const renderMessage = ({ item }: { item: any }) => (
            <View
                style={[
                    styles.messageContainer,
                    item.sender === "client"
                        ? styles.clientMessage
                        : styles.farmerMessage,
                ]}
            >
                {item.sender === "farmer" && (
                    <Image
                        source={require("../../../../assets/images/icon.png")}
                        style={styles.avatar}
                    />
                )}
                <View
                    style={[
                        styles.messageBubble,
                        item.sender === "client"
                            ? styles.clientBubble
                            : styles.farmerBubble,
                    ]}
                >
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                </View>
            </View>
        );

        return (
            <View style={styles.container}>
                {/* Chat Header */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require("../../../../assets/images/farmer-man.jpg")}
                                style={styles.avatar}
                            />
                            <View style={styles.onlineIndicator} />
                        </View>
                        <View>
                            <Text style={styles.userName}>John's Organic Farm</Text>
                            <Text style={styles.statusText}>Online</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.headerButton}>...</Text>
                    </TouchableOpacity>
                </View>

                {/* Chat Messages */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesContainer}
                    inverted
                />

                {/* Message Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        disabled={!newMessage.trim()}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.light.background,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            paddingTop: 50,
            backgroundColor: Colors.light.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 4,
        },
        userInfo: {
            flexDirection: "row",
            alignItems: "center",
        },
        avatarContainer: {
            position: "relative",
            marginRight: 12,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: Colors.light.surface,
        },
        onlineIndicator: {
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: Colors.status.success,
            borderWidth: 2,
            borderColor: Colors.light.primary,
            bottom: 0,
            right: 0,
        },
        userName: {
            fontSize: 18,
            fontWeight: "600",
            color: Colors.light.surface,
        },
        statusText: {
            fontSize: 12,
            color: Colors.light.accent_green,
        },
        headerButton: {
            color: Colors.light.surface,
            fontSize: 24,
            marginTop: -8,
        },
        messagesContainer: {
            padding: 16,
            paddingBottom: 80,
        },
        messageContainer: {
            flexDirection: "row",
            marginBottom: 16,
            alignItems: "flex-end",
        },
        clientMessage: {
            justifyContent: "flex-end",
        },
        farmerMessage: {
            justifyContent: "flex-start",
        },
        messageBubble: {
            maxWidth: "80%",
            padding: 12,
            borderRadius: 16,
            marginHorizontal: 8,
        },
        clientBubble: {
            backgroundColor: Colors.light.accent,
            borderBottomRightRadius: 4,
        },
        farmerBubble: {
            backgroundColor: Colors.light.surface,
            borderBottomLeftRadius: 4,
            elevation: 2,
        },
        messageText: {
            fontSize: 16,
            color: Colors.light.text,
        },
        messageTime: {
            fontSize: 10,
            color: Colors.light.text,
            opacity: 0.6,
            marginTop: 4,
            alignSelf: "flex-end",
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            paddingBottom: 24,
            backgroundColor: Colors.light.surface,
            borderTopWidth: 1,
            borderTopColor: Colors.light.background,
        },
        input: {
            flex: 1,
            minHeight: 40,
            maxHeight: 120,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: Colors.light.accent_green,
            borderRadius: 20,
            marginRight: 8,
            fontSize: 16,
            color: Colors.light.text,
        },
        sendButton: {
            backgroundColor: Colors.light.primary,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        sendButtonText: {
            color: Colors.light.surface,
            fontWeight: "600",
        },
    });

    export default ChatScreen;
