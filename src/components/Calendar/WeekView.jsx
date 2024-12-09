import React from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, addHours, startOfDay } from 'date-fns';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const WeekView = ({ selectedDate, events, onEventClick }) => {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(weekStart);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForTimeSlot = (day, hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventStart = parseInt(event.startTime.split(':')[0]);
      return isSameDay(eventDate, day) && eventStart === hour;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        <div className="w-20"></div>
        {days.map(day => (
          <div
            key={day.toISOString()}
            className="flex-1 px-2 py-3 text-center border-l"
          >
            <div className="text-sm font-medium">{format(day, 'EEE')}</div>
            <div className={`text-sm mt-1 ${isSameDay(day, new Date()) ? 'bg-calendar-blue text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <div className="w-20 flex-shrink-0">
          {timeSlots.map(hour => (
            <div key={hour} className="h-12 border-b text-right pr-2 text-sm text-gray-500">
              {format(addHours(startOfDay(selectedDate), hour), 'HH:mm')}
            </div>
          ))}
        </div>
        <div className="flex flex-1">
          {days.map(day => (
            <div key={day.toISOString()} className="flex-1 border-l">
              {timeSlots.map(hour => (
                <Droppable
                  key={`${format(day, 'yyyy-MM-dd')}-${hour}`}
                  droppableId={`day-${format(day, 'yyyy-MM-dd')}-${hour}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`h-12 border-b relative ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                    >
                      {getEventsForTimeSlot(day, hour).map((event, index) => (
                        <Draggable
                          key={event.id}
                          draggableId={event.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => onEventClick(event)}
                              className={`absolute inset-x-0 mx-1 p-1 text-sm rounded truncate cursor-pointer transition-colors ${snapshot.isDragging ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                              style={{
                                top: '0.25rem',
                                bottom: '0.25rem',
                                ...provided.draggableProps.style
                              }}
                            >
                              {event.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;