// Input box not being properly locked when prompt is generated
// Loading box for session start


"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SessionDetail({ params }) {
  const { "lang-code": langCode, id } = params;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [botTyping, setBotTyping] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ helper for safe bot message append (no duplicates)
  const appendBotMessage = (text) => {
    setMessages((prev) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (last.sender === "Bot" && last.message === text) {
          return prev; // skip duplicate
        }
      }
      return [
        ...prev,
        {
          message: text,
          sender: "Bot",
          direction: "incoming",
          position: "single",
          avatar: <Avatar src="/avatar.png" name="Bot" size="lg" />
        }
      ];
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/sessions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSessionInfo(data);
        if (data && data.message) {
          appendBotMessage(data.message);
        }
      })
      .catch(() => setSessionInfo(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSend = async (val) => {
    if (!val.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        message: val,
        sender: "User",
        direction: "outgoing",
        position: "single",
        avatar: <Avatar src="/fris.jpg" name="User" size="lg" />
      }
    ]);

    setInput("");
    setBotTyping(true);

    const response = await fetch(`${API_BASE_URL}/api/sessions/${id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Bot response data:", data);

      if (data.status === "<END OF CONVERSATION>") {
        setConversationEnded(true);
        if (data.message) appendBotMessage(data.message);
        setBotTyping(false);
        return;
      }

      appendBotMessage(data.message);
    } else {
      appendBotMessage("Üzgünüm, bir hata oluştu.");
    }
    setBotTyping(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-[#FAFDD6] rounded-xl shadow-lg p-8">
          <span className="text-4xl mb-4 animate-bounce">🍽️</span>
          <p className="text-2xl text-[#647FBC] font-bold mb-2">
            Oturum yükleniyor...
          </p>
          <div className="w-16 h-16 border-4 border-[#647FBC] border-t-[#AED6CF] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background image fills viewport */}
      <div className="bg-page"></div>
      {/* Main chat content */}
      <div className="relative flex flex-col items-center justify-center w-screen p-0">
        <div className="relative z-10 w-full h-[calc(100vh-64px)] sm:w-[70vw] sm:h-[80vh] flex flex-col rounded-2xl shadow-xl overflow-hidden bg-[#FAFDD6] border-5 border-[#647FBC]">
          {/* Scenario info message OUTSIDE scrollable area */}
          <div className="w-full flex justify-center pt-4 mb-2 px-4">
            <div className="flex flex-col items-center bg-[#647FBC]/10 text-[#647FBC] px-6 py-2 rounded-xl text-lg font-semibold italic shadow-none pointer-events-none select-none">
              {sessionInfo?.title
                ? `Senaryo: ${sessionInfo.title}`
                : "Senaryo 1: Restoran"}
              <span className="text-[#647FBC] font-bold">Restoranda bir garsonla yemek siparişi verme pratiği yap.</span>
            </div>
          </div>
          {/* Chat messages area (only this is scrollable) */}
          <div className="bg-chat flex-1 overflow-y-auto px-4 py-4">
            <MessageList
              typingIndicator={
                botTyping ? (
                  <TypingIndicator content="Bot yazıyor..." />
                ) : null
              }
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
                  }}
                  className={msg.sender === "User" ? "justify-end" : "justify-start"}
                >
                  {msg.avatar &&
                    (typeof msg.avatar === "string" ? (
                      <Avatar src={msg.avatar} name={msg.sender} size="lg" />
                    ) : (
                      msg.avatar
                    ))}
                </Message>
              ))}
            </MessageList>
          </div>
          {/* Input box or conversation over message */}
          <div className="px-4 py-3">
            {!conversationEnded ? (
              <MessageInput
                value={input}
                onChange={setInput}
                onSend={handleSend}
                placeholder={botTyping ? "Lütfen bekleyin..." : "Cevabınızı yazın..."}
                attachButton={false}
                sendButton={true}
                sendDisabled={botTyping || conversationEnded}
                disabled={botTyping || conversationEnded} // <-- Add this line
                className="text-[#FAFDD6] rounded-lg px-4 py-2 w-full"
              />
            ) : (
              <div className="text-lg p-4 bg-blue-400 text-white text-center font-semibold rounded-lg">
                <p>Konuşma sona erdi.</p>
                <Link
                  className="font-bold underline"
                  href={`/${langCode}/sessions/${id}/evaluation`}
                >
                  Değerlendirmeye git
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}