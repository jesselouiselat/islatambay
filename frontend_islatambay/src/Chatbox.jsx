import { useState, useEffect, useRef } from "react";
import axiosInstance from "./api/AxiosInstance";

function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  async function sendInquiry() {
    if (!userInput.trim()) return;

    try {
      const userMessage = {
        role: "user",
        message: userInput,
      };
      setChat((prevChat) => [...prevChat, userMessage]);
      setUserInput("");
      setIsTyping(true);

      const result = await axiosInstance.post("/api/ai/ask-gemini", {
        message: userInput,
      });
      setIsTyping(false);

      const botMessage = {
        role: "bot",
        message: result.data.message,
      };

      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") sendInquiry();
  }

  return (
    <section id="aiChat">
      <div
        className="container border rounded-4 p-3"
        style={{
          height: "500px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 className="border-bottom pb-2"> Islatambay</h4>
        {/* Chat message container */}
        <div className="flex-grow-1 overflow-auto mb-3" id="chat-messages">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 text-${msg.role === "user" ? "end" : "start"}`}
            >
              <span
                className={`badge fw-normal fs-6 ${
                  msg.role === "user" ? "bg-success" : "bg-info"
                }`}
                style={{
                  whiteSpace: "pre-wrap", // keeps line breaks
                  wordBreak: "break-word", // wraps long words
                  maxWidth: "75%", // avoids full-width messages
                  display: "inline-block", // allows wrapping
                  textAlign: "left",
                }}
              >
                {msg.message.replace(/\*\*/g, "")}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="mb-2 text-start">
              <span
                className="badge fw-normal bg-info"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  maxWidth: "75%",
                  display: "inline-block",
                  textAlign: "left",
                  fontStyle: "italic",
                  opacity: 0.6,
                }}
              >
                ...
              </span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ask anything about our services..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className="btn btn-success" onClick={sendInquiry}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;
