import React from 'react';
import { format, addHours, startOfDay, isSameDay } from 'date-fns';

const DayView = ({ selectedDate, events, onEventClick }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForTimeSlot = (hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventStart = parseInt(event.startTime.split(':')[0]);
      return isSameDay(eventDate, selectedDate) && eventStart === hour;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <div className="w-20 flex-shrink-0">
          {timeSlots.map(hour => (
            <div key={hour} className="h-12 border-b text-right pr-2 text-sm text-gray-500">
              {format(addHours(startOfDay(selectedDate), hour), 'HH:mm')}
            </div>
          ))}
        </div>
        <div className="flex-1 border-l">
          {timeSlots.map(hour => (
            <div key={hour} className="h-12 border-b relative">
              {getEventsForTimeSlot(hour).map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="absolute inset-x-0 bg-blue-100 text-blue-700 rounded p-1 text-sm mx-2 cursor-pointer hover:bg-blue-200"
                  style={{ top: '0.25rem', bottom: '0.25rem' }}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs truncate">{event.description}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;