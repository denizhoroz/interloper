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
  const { "lang-code": langCode, id } =
    typeof params.then === "function" ? use(params) : params;

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
          avatar: <Avatar src="/avatar.png" name="Bot" size="md" />
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
        avatar: <Avatar src="/fris.jpg" name="User" size="md" />
      }
    ]);

    setInput("");
    setBotTyping(true);

    const response = await fetch(`${API_BASE_URL}/api/sessions/${id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val })
    });

    setBotTyping(false);

    if (response.ok) {
      const data = await response.json();
      console.log("Bot response data:", data);

      if (data.status === "<END OF CONVERSATION>") {
        setConversationEnded(true);
        if (data.message) appendBotMessage(data.message);
        return;
      }

      appendBotMessage(data.message);
    } else {
      appendBotMessage("Üzgünüm, bir hata oluştu.");
    }
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
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-full sm:max-w-3xl flex flex-col flex-1 h-[90vh] sm:h-[80vh]">
        <div className="mb-4 sm:mb-6 bg-[#FAFDD6] p-2 sm:p-4 rounded-lg shadow-md text-center relative overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] rounded-b-xl shadow" />
          <div className="flex justify-center mb-2 mt-2">
            <span className="inline-block text-3xl sm:text-5xl animate-bounce">
              🍽
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-6xl font-extrabold text-[#647FBC] mb-2 sm:mb-4 text-center drop-shadow-lg">
            {langCode === "gb"
              ? "İngilizce"
              : langCode === "de"
              ? "Almanca"
              : langCode}{" "}
            Oturumu #{id}
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

        {/* Chat area */}
        <div className="flex-1 rounded-lg shadow-md overflow-hidden">
          <MainContainer>
            <ChatContainer>
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
                      avatarSpacer: true
                    }}
                  >
                    {msg.avatar &&
                      (typeof msg.avatar === "string" ? (
                        <Avatar src={msg.avatar} name={msg.sender} />
                      ) : (
                        msg.avatar
                      ))}
                  </Message>
                ))}
              </MessageList>

              {/* ✅ When conversation ends, hide the input */}
              {!conversationEnded && (
                <MessageInput
                  value={input}
                  onChange={setInput}
                  onSend={handleSend}
                  placeholder={
                    botTyping ? "Lütfen bekleyin..." : "Cevabınızı yazın..."
                  }
                  attachButton={false}
                  sendButton={true}
                  sendDisabled={botTyping}
                />
              )}
            </ChatContainer>
          </MainContainer>
          {conversationEnded && (
            <div className="p-4 bg-green-100 text-green-800 text-center font-semibold">
              <p>Konuşma sona erdi.</p>
              <Link className="font-bold underline" href={`/${langCode}/sessions/${id}/evaluation`}>
                Değerlendirmeye git
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
