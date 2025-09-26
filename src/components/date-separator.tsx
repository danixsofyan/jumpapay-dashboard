import React, { type FC } from 'react';

interface DateSeparatorProps {
    date: string;
}

const DateSeparator: FC<DateSeparatorProps> = ({ date }) => {
    const formatDate = (dateString: string) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const targetDate = new Date(dateString);
        
        if (targetDate.toDateString() === today.toDateString()) {
            return "Hari Ini";
        }
        if (targetDate.toDateString() === yesterday.toDateString()) {
            return "Kemarin";
        }
        return targetDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="flex justify-center my-4">
            <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full dark:bg-neutral-800 dark:text-neutral-400">
                {formatDate(date)}
            </span>
        </div>
    );
};

export default DateSeparator;
