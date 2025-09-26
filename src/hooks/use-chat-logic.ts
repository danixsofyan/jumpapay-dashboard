import { useState, useMemo } from 'react';
import { isToday, isYesterday, subWeeks, isAfter } from 'date-fns';
import rawChatData from '@/data/data-raw-chat.json';

export interface ChatMessage {
    id: number;
    sender: 'customer' | 'admin';
    message: string; 
    time: string; 
    date: string;
    status: 'sent' | 'read' | 'failed'; 
}

export interface DetailedChatUser {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: number;
    avatar: string;
    assignedTo: 'me' | 'other' | null;
    assignedByName: string | null;
    isRead: boolean;
    status: 'active' | 'closed';
    date: Date;
    history: ChatMessage[];
}

export interface ChatTotals {
    available: number;
    taken: number;
}

export const useChatLogic = () => {
    const [activeTab, setActiveTab] = useState('sudah-diambil'); 
    const [activeSubTab, setActiveSubTab] = useState('semua');
    const [readMessages, setReadMessages] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(false);
    const [activeSession, setActiveSession] = useState<boolean | null>(null);
    const [closeSession, setCloseSession] = useState<boolean | null>(null);
    const [dateFilter, setDateFilter] = useState('today');
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const processedChatUsers: DetailedChatUser[] = useMemo(() => {
        interface RawChatDataInput extends Omit<DetailedChatUser, 'date'> {
            date: string;
        }

        const rawChats: RawChatDataInput[] = rawChatData as RawChatDataInput[];
        
        return rawChats.map(chat => ({
            ...chat,
            date: new Date(chat.date),
        })) as DetailedChatUser[];
    }, []);

    const totals: ChatTotals = useMemo(() => {
        const available = processedChatUsers.filter(chat => chat.assignedTo === null).length;
        const taken = processedChatUsers.filter(chat => chat.assignedTo !== null).length;
        return { available, taken };
    }, [processedChatUsers]);

    const filteredChats: DetailedChatUser[] = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const oneWeekAgo = subWeeks(new Date(), 1);

        return processedChatUsers.filter(chat => {
            const matchesSearch = chat.name.toLowerCase().includes(query) || chat.message.toLowerCase().includes(query);
            if (!matchesSearch) return false;
            const isTaken = chat.assignedTo !== null;
            const chatMatchesMainTab = activeTab === 'belum-diambil' ? !isTaken : isTaken;
            if (!chatMatchesMainTab) return false;
            if (readMessages && !chat.isRead) return false;
            if (unreadMessages && chat.isRead) return false;
            if (activeSession === true && chat.status !== 'active') return false;
            if (closeSession === true && chat.status !== 'closed') return false;
            if (dateFilter === 'yesterday' && !isYesterday(chat.date)) return false;
            if (dateFilter === 'last-week' && !isAfter(chat.date, oneWeekAgo)) return false;
            if (dateFilter === 'today' && !isToday(chat.date)) return false;
            if (activeTab === 'sudah-diambil') {
                if (activeSubTab === 'saya') {
                    return chat.assignedTo === 'me';
                }
                if (activeSubTab === 'lainnya') {
                    return chat.assignedTo === 'other';
                }
            }
            return true;
        });
    }, [activeTab, activeSubTab, searchQuery, readMessages, unreadMessages, activeSession, closeSession, dateFilter, processedChatUsers]);

    const myChats = filteredChats.filter(chat => chat.assignedTo === 'me');
    const otherChats = filteredChats.filter(chat => chat.assignedTo === 'other');
    const availableChats = filteredChats.filter(chat => chat.assignedTo === null);
    const selectedChat: DetailedChatUser | null = useMemo(() => { 
        return processedChatUsers.find(chat => chat.id === activeChatId) || null;
    }, [activeChatId, processedChatUsers]); 
    
    const isOtherUserChat = selectedChat ? selectedChat.assignedTo === 'other' : false;

    return {
        activeTab, setActiveTab,
        activeSubTab, setActiveSubTab,
        readMessages, setReadMessages,
        unreadMessages, setUnreadMessages,
        activeSession, setActiveSession,
        closeSession, setCloseSession,
        dateFilter, setDateFilter,
        activeChatId, setActiveChatId,
        searchQuery, setSearchQuery,
        totals,
        availableChats,
        myChats,
        otherChats,
        selectedChat,
        isOtherUserChat,
    };
};