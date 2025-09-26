import React, { type FC } from 'react';
import { cn } from '@/lib/utils';
import { type ChatMessage } from '@/hooks/use-chat-logic';
import { Check, CheckCheck } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: FC<ChatBubbleProps> = ({ message }) => {
  const isIncoming = message.sender === 'customer';
  const status = message.status || 'sent'; 
  
  const bubbleClasses = cn(
    "max-w-[75%] p-3 rounded-xl shadow-md text-sm",
    {
      "bg-gray-100/50 dark:bg-neutral-700 text-gray-900 dark:text-white": isIncoming,
      "bg-primary text-white ml-auto": !isIncoming,
      
      "rounded-bl-none": !isIncoming, 
      "rounded-tr-none": isIncoming, 
    }
  );

  const statusIcon = () => {
    switch (status) {
      case 'read':
        return <CheckCheck className="w-3 h-3 ml-1 text-blue-400" />;
      case 'sent':
      default:
        return <Check className="w-3 h-3 ml-1 text-gray-400 dark:text-neutral-500" />;
    }
  };

  return (
    <div className={cn("flex w-full", isIncoming ? "justify-start" : "justify-end")}>
      <div className={bubbleClasses}>
        
        {/* Message Content - Using message.message */}
        <p className="whitespace-pre-wrap">
          {message.message} 
        </p>

        {/* Timestamp and Status - Using message.time */}
        <div className={cn("mt-1 flex items-center", isIncoming ? "justify-start" : "justify-end")}>
          <span className={cn(
            "text-xs", 
            isIncoming ? "text-gray-500 dark:text-neutral-400" : "text-white/70"
          )}>
            {message.time}
          </span>
          
          {/* Show status only for outgoing messages (Admin) */}
          {!isIncoming && statusIcon()}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
