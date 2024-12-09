import React, { useState } from 'react';
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
    setEvents([...events, { ...event, id: Date.now() }]);
    setIsEventModalOpen(false);
  };

  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthView 
          selectedDate={selectedDate} 
          events={events} 
          onEventClick={(event) => console.log('Event clicked:', event)}
          onDateClick={(date) => setSelectedDate(date)}
        />;
      case 'week':
        return <WeekView 
          selectedDate={selectedDate} 
          events={events}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />;
      case 'day':
        return <DayView 
          selectedDate={selectedDate} 
          events={events}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />;
      default:
        return null;
    }
  };

  return (
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
  );
};

export default Calendar;