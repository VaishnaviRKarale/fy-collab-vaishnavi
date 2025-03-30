import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../redux/chatSlice";
import io from "socket.io-client";
import moment from "moment";
import Navbar from "./shared/Navbar";
import { ThemeContext } from "@/ThemeContext";

const socket = io("http://localhost:8000");

const getUserColor = (username) => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3375FF",
    "#F3C300",
    "#BC8F8F",
    "#9370DB",
    "#40E0D0",
    "#FFA07A",
    "#FF69B4",
    "#DC143C",
    "#8A2BE2",
    "#00CED1",
    "#FFD700",
    "#6495ED",
    "#2E8B57",
    "#FF6347",
    "#4682B4",
    "#ADFF2F",
    "#9932CC",
    "#FF4500",
    "#1E90FF",
    "#D2691E",
    "#B22222",
    "#32CD32",
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ChatComponent = () => {

  const {theme, toggleTheme} = useContext(ThemeContext)
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [message, setMessage] = useState("");
  const { user } = useSelector((store) => store.auth);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewMessagesButton, setShowNewMessagesButton] = useState(false);

  useEffect(() => {
    socket.on("previousMessages", (msgs) => {
      dispatch(setMessages(msgs));
    });

    socket.on("receiveMessage", (msg) => {
      dispatch(addMessage(msg));
      if (isAtBottom) {
        scrollToBottom();
      } else {
        setShowNewMessagesButton(true);
      }
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [dispatch, isAtBottom]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: user.fullname,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", msgData);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowNewMessagesButton(false);
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;

    setIsAtBottom(atBottom);

    if (atBottom) {
      setShowNewMessagesButton(false);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className={`p-4 w-auto mx-auto ${theme === "dark" ? "bg-[#191919]" : "bg-white"}`}>
        <h2 className="text-lg text-center font-semibold mb-3">
          Chat Room - {user.fullname}
        </h2>

        <div
          ref={chatContainerRef}
          className="max-h-[82vh] overflow-y-auto relative"
          onScroll={handleScroll}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-1 p-2 w-auto rounded flex justify-between items-end ${theme === "dark" ? "border border-gray-600" : "border"}`}
            >
              <div>
                <strong style={{ color: getUserColor(msg.sender) }}>
                  {msg.sender}
                </strong>
                <p className={`text-justify ${theme === "dark" ? "text-gray-300" : ""}`}>{msg.text}</p>
              </div>
              <span className={`text-xs ml-2 ${theme === "dark" ? "text-gray-200" : "text-gray-500"}`}>
                {moment(msg.timestamp).format("h:mm A")}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showNewMessagesButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            New Messages ↓
          </button>
        )}

        <div className="mt-3 flex">
          <input
            type="text"
            className={`flex-1 p-2 rounded-l ${theme === "dark" ? "bg-[#2f2f2f] text-gray-100" : "border"}`}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
