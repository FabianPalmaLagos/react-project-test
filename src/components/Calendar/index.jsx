import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { startOfDay, format, parse, addDays } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventModal from './EventModal';

const Calendar = () => {
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now().toString() }]);
    setIsEventModalOpen(false);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Drop outside valid area
    if (!destination) return;

    // No actual movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const updatedEvents = [...events];
    const eventIndex = events.findIndex(e => e.id === draggableId);
    const event = events[eventIndex];

    // Remove from source
    updatedEvents.splice(eventIndex, 1);

    // Calculate new date based on destination
    const newDate = calculateNewDate(destination.droppableId, event);

    // Add to destination
    const updatedEvent = {
      ...event,
      date: format(newDate, 'yyyy-MM-dd'),
    };

    updatedEvents.splice(destination.index, 0, updatedEvent);
    setEvents(updatedEvents);
  };

  const calculateNewDate = (droppableId, event) => {
    // droppableId format: 'day-YYYY-MM-DD'
    const dateString = droppableId.split('-').slice(1).join('-');
    return parse(dateString, 'yyyy-MM-dd', new Date());
  };

  const renderView = () => {
    const commonProps = {
      selectedDate,
      events,
      onEventClick: (event) => console.log('Event clicked:', event),
    };

    switch (view) {
      case 'month':
        return (
          <MonthView
            {...commonProps}
            onDateClick={(date) => setSelectedDate(date)}
          />
        );
      case 'week':
        return <WeekView {...commonProps} />;
      case 'day':
        return <DayView {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-white rounded-lg shadow">
        <CalendarHeader
          view={view}
          onViewChange={setView}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onAddEvent={() => setIsEventModalOpen(true)}
        />
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onSubmit={handleAddEvent}
          selectedDate={selectedDate}
        />
      </div>
    </DragDropContext>
  );
};

export default Calendar;