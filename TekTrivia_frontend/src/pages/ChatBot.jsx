import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour 👋 ! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Réponse simulée (remplace par appel API si besoin)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Je suis un assistant virtuel. Vous avez dit : "${input}"`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton pour ouvrir/fermer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="w-80 h-96 bg-white border rounded-xl shadow-lg flex flex-col mt-2">
          <div className="bg-blue-600 text-white text-lg p-3 font-semibold rounded-t-xl">
            Assistant TekTrivia
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[90%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Écrivez un message..."
              className="flex-1 border px-3 py-1 rounded-md text-sm"
            />
            <button onClick={handleSend} className="text-blue-600">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
