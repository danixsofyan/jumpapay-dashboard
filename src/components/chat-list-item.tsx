import React, { type FC } from 'react';
import Image from 'next/image';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type DetailedChatUser } from '@/hooks/use-chat-logic'; 

interface ChatListItemProps {
  chat: DetailedChatUser; 
  isActive: boolean;
  isPassive: boolean; 
  onSelect: (id: number) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ chat, isActive, isPassive, onSelect }) => {
  return (
    <div
      key={chat.id}
      onClick={() => onSelect(chat.id)}
      className={cn(
        "flex items-center p-3 cursor-pointer transition-colors duration-150",
        "border-b border-gray-100 dark:border-neutral-800",
        isActive ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-100 dark:hover:bg-neutral-800/50",
        isPassive && "opacity-60 hover:opacity-100"
      )}
    >
      <div className="relative flex-shrink-0 mr-4">
        <Image src={chat.avatar} alt={chat.name} width={48} height={48} className="rounded-full" />
        {chat.status === 'closed' && (
            <Lock className="absolute bottom-0 right-0 h-4 w-4 p-0.5 bg-white dark:bg-neutral-900 rounded-full text-red-500 border border-white dark:border-neutral-900" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</p>
        <p className="text-sm text-gray-500 dark:text-neutral-400 truncate flex items-center">
          {chat.isRead && !chat.unread ? <Check className='h-4 w-4 inline-block text-primary mr-1 flex-shrink-0' /> : null}
          {chat.message}
        </p>
        {chat.assignedTo === 'other' && (
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
            Diambil oleh {chat.assignedByName}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end pl-2 flex-shrink-0 w-16 justify-start **self-start**">
        <p className="text-xs text-gray-400 mb-0 whitespace-nowrap">{chat.time}</p>
        {chat.unread > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full mt-1">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;