// cursor jumping to the end post bot response also sometimes disappearing fix NEEDED
"use client";
import { use, useState, useEffect} from "react";
import Image from "next/image";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SessionDetail({ params }) {
  const { "lang-code": langCode, id } = typeof params.then === "function" ? use(params) : params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/sessions/${id}`)
      .then(res => res.json())
      .then(data => {
        setSessionInfo(data);
        // If sessionInfo.message exists, add it as a bot message at the start
        if (data && data.message) {
          setMessages(prev => [
            {
              message: data.message,
              sender: "Bot",
              direction: "incoming",
              position: "single",
              avatar: <Avatar src="/avatar.png" name="Bot" size="md"/>
            },
            ...prev
          ]);
        }
      })
      .catch(() => setSessionInfo(null));
  }, [id]);

  const handleSend = async (val) => {
    if (!val.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        message: val,
        sender: "User",
        direction: "outgoing",
        position: "single",
        avatar: <Avatar src="/fris.jpg" name="User" size="md"/>
      }
    ]);
    setInput("");
    setBotTyping(true); // Show typing indicator

    const response = await fetch(`${API_BASE_URL}/api/sessions/${id}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: val }),
    });
    setBotTyping(false); // Hide typing indicator

    if (response.ok) {
      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          message: data.message,
          sender: "Bot",
          direction: "incoming",
          position: "single",
          avatar: <Avatar src="/avatar.png" name="Bot" size="md"/>
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          message: "Üzgünüm, bir hata oluştu.",
          sender: "Bot",
          direction: "incoming",
          position: "single",
          avatar: <Avatar src="/avatar.png" name="Bot" size="md"/>
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-full sm:max-w-3xl flex flex-col flex-1 h-[90vh] sm:h-[80vh]">
        <div className="mb-4 sm:mb-6 bg-[#FAFDD6] p-2 sm:p-4 rounded-lg shadow-md text-center relative overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] rounded-b-xl shadow" />
          <div className="flex justify-center mb-2 mt-2">
            <span className="inline-block text-3xl sm:text-5xl animate-bounce">🍽</span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-6xl font-extrabold text-[#647FBC] mb-2 sm:mb-4 text-center drop-shadow-lg">
            {langCode === "gb" ? "İngilizce" : langCode === "de" ? "Almanca" : langCode} Oturumu #{id}
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl text-[#647FBC] font-semibold mb-1 sm:mb-2">
            {id === "1"
              ? "Senaryo 1: Restoran Diyaloğu"
              : "Senaryo açıklaması burada olacak."}
          </h2>
          <p className="text-base sm:text-xl text-[#647FBC]">
            {id === "1"
              ? "Bir arkadaşınla restoranda geçen bir konuşma oturumu."
              : "Senaryo açıklaması burada olacak."}
          </p>
        </div>
        {/* Chat area with input inside */}
        <div className="flex-1 rounded-lg shadow-md overflow-hidden">
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={botTyping ? <TypingIndicator content="Bot yazıyor..." /> : null}
              >
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    model={{
                      message: msg.message,
                      sentTime: "now",  
                      sender: msg.sender,
                      direction: msg.direction,
                      position: msg.position,
                      avatarSpacer: true
                    }}
                  >
                    {msg.avatar && (typeof msg.avatar === 'string' ? <Avatar src={msg.avatar} name={msg.sender} /> : msg.avatar)}
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                value={input}
                onChange={setInput}
                onSend={handleSend}
                placeholder={botTyping && "Lütfen bekleyin..." || "Cevabınızı yazın..."}
                attachButton={false}
                sendButton={true}
                sendDisabled={botTyping}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}