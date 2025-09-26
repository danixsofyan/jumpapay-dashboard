import React, { type FC } from 'react';
import ChatListItem from './chat-list-item';
import { type DetailedChatUser } from '@/hooks/use-chat-logic';

interface ChatListProps {
  chats: DetailedChatUser[];
  groupHeader: string;
  isPassive?: boolean;
  activeChatId: number | null;
  setActiveChatId: (id: number) => void;
}

const ChatList: FC<ChatListProps> = ({ chats, groupHeader, isPassive = false, activeChatId, setActiveChatId }) => {
  if (chats.length === 0) return null;

  return (
    <>
      {groupHeader && (
        <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 mt-4 mb-2 px-3">
          {groupHeader}
        </p>
      )}
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={activeChatId === chat.id}
          isPassive={isPassive}
          onSelect={setActiveChatId}
        />
      ))}
    </>
  );
};

export default ChatList;