"use client";

import React, { useState, useRef, useEffect, useMemo, type FC } from 'react';
import Image from 'next/image';
import { Search, Plus, Mic, ChevronRight, Smile, Lock, Send } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { type DetailedChatUser, type ChatMessage } from '@/hooks/use-chat-logic';
import ChatBubble from './chat-bubble';
import DateSeparator from './date-separator';
import rawTemplates from '@/data/data-template-chat.json'; 
import { Icon } from '@iconify/react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}
interface AttachmentMenuItem {
  icon: React.FC<IconProps>;
  label: string;
}

const attachmentMenu: AttachmentMenuItem[] = [
  { icon: (props: IconProps) => <Icon icon="solar:document-text-linear" {...props} />, label: "Dokumen" },
  { icon: (props: IconProps) => <Icon icon="solar:gallery-outline" {...props} />, label: "Foto & Video" },
  { icon: (props: IconProps) => <Icon icon="solar:camera-linear" {...props} />, label: "Kamera" },
  { icon: (props: IconProps) => <Icon icon="solar:headphones-round-linear" {...props} />, label: "Audio" },
  { icon: (props: IconProps) => <Icon icon="solar:wallet-outline" {...props} />, label: "Metode Pembayaran" },
  { icon: (props: IconProps) => <Icon icon="solar:document-add-linear" {...props} />, label: "Invoice" },
  { icon: (props: IconProps) => <Icon icon="solar:document-add-linear" {...props} />, label: "Konfirmasi ELTE" },
  { icon: (props: IconProps) => <Icon icon="solar:document-add-linear" {...props} />, label: "Tambah Orderan" }
];

interface ChatDetailProps {
  chat: DetailedChatUser; 
  isReadOnly: boolean; 
  onCloseDetail: () => void; 
}

const ChatDetail: FC<ChatDetailProps> = ({ chat, isReadOnly, onCloseDetail }) => {
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const templateMenuRef = useRef<HTMLDivElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  const chatHistory = useMemo<ChatMessage[]>(() => {
    return chat.history || [];
  }, [chat.history]);
  
  useEffect(() => {
    if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chat.id, chatHistory]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;
        
        if (attachmentMenuRef.current && attachmentMenuRef.current.contains(target)) return;
        if (templateMenuRef.current && templateMenuRef.current.contains(target)) return;
        
        if (inputBarRef.current && !inputBarRef.current.contains(target)) {
            setIsAttachmentOpen(false);
            setIsTemplateMenuOpen(false);
        }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); 

  const handleSendMessage = () => {
      if (chatInput.trim() === '' || isReadOnly) return;
      console.log(`Sending message: ${chatInput}`);
      setChatInput('');
  };

  const handleToggleAttachment = () => {
    if (isReadOnly) return;
    setIsTemplateMenuOpen(false);
    setIsAttachmentOpen(!isAttachmentOpen);
  };
  
  const handleToggleTemplate = () => {
    if (isReadOnly) return;
    setIsAttachmentOpen(false);
    setIsTemplateMenuOpen(!isTemplateMenuOpen);
  };
  
  const handleTemplateSelect = (templateText: string) => {
    setChatInput(templateText);
    setIsTemplateMenuOpen(false);
  };
  
  const renderChatHistory = () => {
    const elements: React.ReactElement[] = []; 
    let lastDate: string | null = null;
    
    chatHistory.forEach((message, index) => {
        const messageDate = message.date; 
        
        if (messageDate !== lastDate) {
            elements.push(<DateSeparator key={`date-${messageDate}-${index}`} date={messageDate} />);
            lastDate = messageDate;
        }
        elements.push(<ChatBubble key={`${message.id}-${index}`} message={message} />);
    });
    
    return elements.length > 0 ? elements : (
      <div className="text-center text-gray-500 dark:text-neutral-400 mt-20">Mulai percakapan baru.</div>
    );
  };


  const chatBackgroundStyle = {
    backgroundImage: "url('/images/chat-bg.svg')", 
    backgroundSize: 'cover',
    backgroundColor: '#EBEBEB',
  };


  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-neutral-900 rounded-2xl">
      
      {/* HEADER CHAT */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <Button variant="ghost" size="icon" onClick={onCloseDetail} className="md:hidden text-gray-700 dark:text-gray-300">
              <ChevronRight className="w-6 h-6 rotate-180" />
          </Button>
          <Image 
            src={chat.avatar || 'https://i.pravatar.cc/150?img=3'} 
            alt={chat.name} 
            width={40} 
            height={40} 
            className="rounded-full" 
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">{chat.name}</p>
            {/* Status */}
            <p 
                className={cn(
                    "text-xs",
                    chat.status === 'active' ? 'text-green-500' : 'text-red-500'
                )}
            >
                {chat.status === 'active' ? 'Active Session' : 'Closed Session'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-neutral-400">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* MESSAGE */}
      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 relative" style={chatBackgroundStyle}>
        {renderChatHistory()}
      </div>

      {/* INPUT BAR (CONTAINER) */}
      <div ref={inputBarRef} className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 relative">
        
        {/* MENU TEMPLATE (Floating) */}
        {isTemplateMenuOpen && !isReadOnly && ( 
          <div 
            ref={templateMenuRef}
            className="absolute bottom-full mb-3 left-4 w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-0 z-20 overflow-y-auto max-h-64"
          >
            {/* HEADER MENU TEMPLATE */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-neutral-700 mb-0">
                <p className="font-bold text-sm text-gray-800 dark:text-white pl-3">Pilih Template</p>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-gray-100 dark:hover:bg-neutral-700">
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
            {/* ITEM LIST */}
            <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-700">
              {(rawTemplates as string[]).map((template, index) => (
                <div 
                    key={index} 
                    onClick={() => handleTemplateSelect(template)} 
                    className="p-3 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer text-sm text-gray-700 dark:text-neutral-300 transition-colors duration-150"
                >
                  {template}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENU ATTACHMENT (Floating) */}
        {isAttachmentOpen && !isReadOnly && (
          <div 
            ref={attachmentMenuRef}
            className="absolute bottom-full mb-3 left-4 w-60 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-0 z-20"
          >
            <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-700">
              {attachmentMenu.map((item, index) => {
                
                const isFirst = index === 0;
                const isLast = index === attachmentMenu.length - 1;
                
                return (
                  <div 
                    key={item.label} 
                    className={cn(
                      "flex items-center gap-4 p-3 cursor-pointer transition-colors duration-150",
                      "hover:bg-gray-50 dark:hover:bg-neutral-700", 
                      isFirst && "rounded-t-xl",
                      isLast && "rounded-b-xl"
                    )}
                  >
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN INPUT BAR */}
        <div className={cn("flex items-center gap-3", isReadOnly && "opacity-60")}>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleAttachment}
            disabled={isReadOnly}
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-zinc-800 flex-shrink-0"
          >
            <Plus className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => { /* handle emoji/smile logic */ }}
            disabled={isReadOnly}
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-zinc-800 flex-shrink-0"
          >
            <Smile className="h-6 w-6" />
          </Button>

          {/* WRAPPER TEMPLATE */}
          <div className="relative flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={handleToggleTemplate}
              disabled={isReadOnly}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Template <ChevronRight className="h-4 w-4" />
            </Button>
            
          </div>


          {/* Input Text (Fleksibel) */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isReadOnly ? "Chat diambil oleh user lain" : "Ketik pesan"}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              disabled={isReadOnly}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 border dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>
            
          {/* Button Mic / Send */}
          <Button 
            onClick={chatInput.trim() !== '' ? handleSendMessage : () => { /* handle mic recording */ }}
            disabled={isReadOnly}
            className={cn(
              "w-10 h-10 rounded-full text-white p-0 flex-shrink-0",
              chatInput.trim() !== '' ? "bg-primary hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
            )}
          >
            {isReadOnly ? (
                <Lock className="h-5 w-5" />
            ) : chatInput.trim() !== '' ? (
                <Send className="h-5 w-5" />
            ) : (
                <Mic className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;