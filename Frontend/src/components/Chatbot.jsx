import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, X, Paperclip, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your farming assistant. Ask me about weather, crops, soil, or send me a photo of your crop for analysis!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const base64 = await convertToBase64(file);
        setSelectedImage(base64);
      }
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setSelectedImage(base64);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage = {
      text: input,
      sender: 'user',
      image: selectedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    const currentImage = selectedImage; // Store ref for API call
    const currentInput = input;

    setInput('');
    setSelectedImage(null);

    try {
      const response = await fetch('http://localhost:7777/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          image: currentImage
        })
      });

      const data = await response.json();
      const botMessage = { text: data.message, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Server is down. Please try again later.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div className="fixed bottom-8 right-8 z-[9999]" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 99999, display: 'block' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border-2 border-white/20"
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <div className="relative">
              <span className="text-3xl">🤖</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-emerald-600"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-28 right-8 z-50 w-96 bg-stone-100 rounded-2xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col"
          style={{ height: '500px' }}
          onDragEnter={handleDrag}
        >
          {/* Header */}
          <div className="p-4 bg-emerald-700 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Farm Assistant</h3>
                <p className="text-emerald-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 relative"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {/* Drag Overlay */}
            {dragActive && (
              <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm border-2 border-dashed border-emerald-500 z-50 flex flex-col items-center justify-center text-emerald-700 pointer-events-none">
                <ImageIcon size={48} className="mb-2 animate-bounce" />
                <p className="font-bold">Drop Image Here</p>
                <p className="text-sm">to analyze crop health</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                  }`}>
                  {msg.image && (
                    <img src={msg.image} alt="Upload" className="rounded-lg mb-2 max-h-40 object-cover border border-white/20" />
                  )}
                  {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-stone-500 text-sm">
                  <Loader2 className="animate-spin" size={14} />
                  Analyzing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-200">
            {selectedImage && (
              <div className="relative mb-3 inline-block">
                <img src={selectedImage} alt="Selected" className="h-20 w-20 object-cover rounded-lg border border-stone-300 shadow-sm" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 bg-stone-100 p-2 rounded-xl border border-stone-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Attach Image"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*"
              />

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={selectedImage ? "Add a caption..." : "Ask about crops or drop an image..."}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 max-h-20 resize-none text-stone-800 placeholder-stone-400"
                rows={1}
              />

              <button
                onClick={sendMessage}
                disabled={(!input.trim() && !selectedImage) || loading}
                className="p-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-stone-400 mt-2">
              Powered by FarmTech AI • Supports JPG, PNG
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;