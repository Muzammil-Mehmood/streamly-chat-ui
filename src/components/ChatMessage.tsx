
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  isStreaming = false,
  timestamp = new Date()
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4 message-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 relative",
        "shadow-sm transition-all duration-200 hover:shadow-md",
        isUser 
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto" 
          : "bg-white border border-gray-200 text-gray-800"
      )}>
        <div className="flex flex-col">
          <div className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap break-words",
            isStreaming && "typing-animation"
          )}>
            {message}
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
            )}
          </div>
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-blue-100" : "text-gray-500"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        {/* Message tail */}
        <div className={cn(
          "absolute top-4 w-3 h-3 transform rotate-45",
          isUser 
            ? "bg-blue-500 -right-1" 
            : "bg-white border-r border-b border-gray-200 -left-1"
        )} />
      </div>
    </div>
  );
};

export default ChatMessage;
