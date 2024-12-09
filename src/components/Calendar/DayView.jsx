import React from 'react';
import { format, addHours, startOfDay, isSameDay } from 'date-fns';
import { Droppable, Draggable } from '@hello-pangea/dnd';

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
            <Droppable
              key={`${format(selectedDate, 'yyyy-MM-dd')}-${hour}`}
              droppableId={`day-${format(selectedDate, 'yyyy-MM-dd')}-${hour}`}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`h-12 border-b relative ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                >
                  {getEventsForTimeSlot(hour).map((event, index) => (
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
                          className={`absolute inset-x-0 mx-2 rounded p-1 cursor-pointer transition-colors ${snapshot.isDragging ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                          style={{
                            top: '0.25rem',
                            bottom: '0.25rem',
                            ...provided.draggableProps.style
                          }}
                        >
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs truncate">{event.description}</div>
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
      </div>
    </div>
  );
};

export default DayView;