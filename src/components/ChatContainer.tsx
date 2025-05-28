
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useStreamingChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
              <p className="text-sm text-gray-500">Ask me anything!</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <Button
              onClick={clearMessages}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              Clear Chat
            </Button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Hello there!</h2>
            <p className="text-gray-500 max-w-md">
              I'm here to help you with your questions. Start a conversation by typing a message below.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                isStreaming={message.isStreaming}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="max-w-4xl mx-auto w-full">
        <MessageInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatContainer;
