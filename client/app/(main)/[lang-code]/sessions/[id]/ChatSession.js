"use client";
import { use, useState, useRef, useEffect } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SessionDetail({ params }) {
  const { "lang-code": langCode, id } = typeof params.then === "function" ? use(params) : params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Merhaba! Restorana hoş geldiniz. Ne sipariş vermek istersiniz?",
    },
  ]);

  // Ref for the chat area
  const chatRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    const response = await fetch(`${API_BASE_URL}/api/sessions/${id}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    // bot response logic can be added here
    if (response.ok) {
      const data = await response.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } else {
      setMessages((prev) => [...prev, { from: "bot", text: "Üzgünüm, bir hata oluştu." }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E3F6F5] p-4">
      <div className="w-full max-w-3xl flex flex-col flex-1 h-[80vh]">
        <div className="mb-6 bg-[#FAFDD6] p-4 rounded-lg shadow-md text-center relative overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] rounded-b-xl shadow" />
          {/* Decorative icon */}
          <div className="flex justify-center mb-2 mt-2">
            <span className="inline-block text-4xl md:text-5xl animate-bounce">🍽</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold text-[#647FBC] mb-4 text-center drop-shadow-lg">
            {langCode === "gb" ? "İngilizce" : langCode === "de" ? "Almanca" : langCode} Oturumu #{id}
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#647FBC] font-semibold mb-2">
            {id === "1"
              ? "Senaryo 1: Restoran Diyaloğu"
              : "Senaryo açıklaması burada olacak."}
          </h2>
          <p className="text-xl text-[#647FBC]">
            {id === "1"
              ? "Bir arkadaşınla restoranda geçen bir konuşma oturumu."
              : "Senaryo açıklaması burada olacak."}
          </p>
        </div>
        {/* Chat area with input inside */}
        <div className="flex flex-col h-full bg-[#FAFDD6] rounded-lg p-6">
          <div
            ref={chatRef}
            className="h-[50rem] overflow-y-auto mb-4 space-y-4"
          >
            {messages.map((msg, idx) =>
              msg.from === "bot" ? (
                <div className="flex items-end justify-start" key={idx}>
                  <img
                    src="/avatar.png"
                    alt="Bot Avatar"
                    className="w-22 h-22 rounded-full mr-3 border border-[#AED6CF] bg-white"
                  />
                  <div className="bg-[#FAFDD6] text-[#647FBC] px-5 py-3 rounded-lg max-w-[70%] text-2xl border border-[#AED6CF] break-words whitespace-pre-line overflow-x-auto">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-end" key={idx}>
                  <div className="bg-[#647FBC] text-[#FAFDD6] px-5 py-3 rounded-lg max-w-[70%] text-2xl border border-[#AED6CF] break-words whitespace-pre-line overflow-x-auto">
                    {msg.text}
                  </div>
                  <img
                    src="/avatar.png"
                    alt="User Avatar"
                    className="w-22 h-22 rounded-full ml-3 border border-[#AED6CF] bg-white"
                  />
                </div>
              )
            )}
          </div>
          {/* Input area inside chat area */}
          <form className="flex gap-3 mt-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Cevabınızı yazın..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-[#AED6CF] focus:outline-none focus:ring-2 focus:ring-[#647FBC] text-[#647FBC] bg-white text-lg"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`bg-[#647FBC] text-[#FAFDD6] px-6 py-3 rounded-lg font-bold transition text-lg
                ${!input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-[#91ADC8]"}`}
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}