import React, { useEffect, useRef, useState } from "react";
import API from "../api";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // replace with backend URL

const ChatBox = ({ currentUserId, selectedUser, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch chat history
  useEffect(() => {
    if (selectedUser?._id) {
      API.get(`/chat/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const data = res.data;
          setMessages(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Failed to load messages:", err);
          setMessages([]);
        });
    }
  }, [selectedUser, token]);

  // Receive new message in real-time
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender === selectedUser._id && msg.receiver === currentUserId) ||
        (msg.sender === currentUserId && msg.receiver === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser, currentUserId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const payload = {
      receiver: selectedUser._id,
      message: newMsg,
    };

    try {
      const res = await API.post("/chat", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const savedMessage = res.data.data;
      socket.emit("sendMessage", savedMessage);
      setNewMsg("");
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4 flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs text-sm ${
              msg.sender === currentUserId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start mr-auto"
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-[10px] mt-1 text-right opacity-70">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
