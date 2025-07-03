import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/AxiosInstance";
import chat_button_logo from "../assets/chat_button_logo.png";
import chat_name from "../assets/chat-name.png";

function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  async function sendInquiry() {
    if (!userInput.trim()) return;

    try {
      const userMessage = { role: "user", message: userInput };
      setChat((prevChat) => [...prevChat, userMessage]);
      setUserInput("");
      setIsTyping(true);

      const result = await axiosInstance.post("/api/ai/ask-gemini", {
        message: userInput,
      });
      setIsTyping(false);

      const botMessage = { role: "bot", message: result.data.message };
      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") sendInquiry();
  }

  return (
    <>
      {/* 🆕 Floating Chat Button */}
      <button
        type="button"
        className="btn bg-transparent rounded-circle "
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "8rem",
          height: "8rem",
          zIndex: 9999,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6rem",
            height: "6rem",
            backgroundImage: `url(${chat_button_logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></span>
      </button>

      {isOpen && (
        <section
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "9rem",
            zIndex: 9999,
          }}
        >
          <div
            id="aiChat"
            className="container border rounded-4 p-3 bg-white shadow"
            style={{
              height: "29rem",
              width: "21rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="border-bottom">
              <img
                className="mb-3"
                src={chat_name}
                style={{ height: "2rem" }}
                alt=""
              />
            </span>

            {/* Messages */}
            <div className="flex-grow-1 overflow-auto mb-3" id="chat-messages">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 text-${
                    msg.role === "user" ? "end" : "start"
                  }`}
                >
                  <span
                    className={`mt-2 badge fw-normal fs-6 ${
                      msg.role === "user" ? "bg-warning" : "bg-danger"
                    }`}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxWidth: "75%",
                      display: "inline-block",
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
                    className="badge fw-normal bg-danger"
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
                    typing...
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
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
      )}
    </>
  );
}

export default ChatBox;
