import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay } from 'date-fns';

const MonthView = ({ selectedDate, events, onEventClick, onDateClick }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getDayEvents = (day) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
        <div key={dayName} className="bg-gray-50 p-2 text-sm font-medium text-gray-500 text-center">
          {dayName}
        </div>
      ))}
      {days.map(day => (
        <div
          key={day.toISOString()}
          onClick={() => onDateClick(day)}
          className={`min-h-[120px] bg-white p-2 ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}`}
        >
          <div className="flex justify-between">
            <span className={`text-sm ${isSameDay(day, new Date()) ? 'bg-calendar-blue text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
              {format(day, 'd')}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            {getDayEvents(day).map(event => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                className="text-sm p-1 bg-blue-100 text-blue-700 rounded truncate cursor-pointer hover:bg-blue-200"
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthView;