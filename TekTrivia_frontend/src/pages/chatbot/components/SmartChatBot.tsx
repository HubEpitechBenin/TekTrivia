import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import askAI from "../aiService";

const SmartChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Salut 👋 ! Pose-moi ta question." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await askAI(input);
      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Une erreur est survenue. Réessaie plus tard.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {isOpen && (
        <div className="w-80 h-[500px] bg-white border rounded-xl shadow-xl flex flex-col mt-2">
          <div className="bg-blue-600 text-white p-4 rounded-t-xl font-bold">
            Assistant IA
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {msg.sender === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                    <span>{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm italic">
                L'assistant réfléchit...
              </div>
            )}
          </div>
          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pose ta question ici..."
              className="flex-1 px-3 py-1 border rounded-md text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={loading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartChatBot;
