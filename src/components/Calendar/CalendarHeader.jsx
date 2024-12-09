import React from 'react';
import { format, addMonths, addWeeks, addDays } from 'date-fns';

const CalendarHeader = ({ view, onViewChange, selectedDate, onDateChange, onAddEvent }) => {
  const handlePrevious = () => {
    switch (view) {
      case 'month':
        onDateChange(addMonths(selectedDate, -1));
        break;
      case 'week':
        onDateChange(addWeeks(selectedDate, -1));
        break;
      case 'day':
        onDateChange(addDays(selectedDate, -1));
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'month':
        onDateChange(addMonths(selectedDate, 1));
        break;
      case 'week':
        onDateChange(addWeeks(selectedDate, 1));
        break;
      case 'day':
        onDateChange(addDays(selectedDate, 1));
        break;
      default:
        break;
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center space-x-4">
        <button
          onClick={onAddEvent}
          className="px-4 py-2 text-sm font-medium text-white bg-calendar-blue rounded-md hover:bg-blue-600"
        >
          Create Event
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-calendar-hover rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-calendar-hover rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onViewChange('month')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${view === 'month' ? 'bg-calendar-hover text-calendar-blue' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Month
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${view === 'week' ? 'bg-calendar-hover text-calendar-blue' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange('day')}
          className={`px-3 py-2 text-sm font-medium rounded-md ${view === 'day' ? 'bg-calendar-hover text-calendar-blue' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Day
        </button>
      </div>
    </header>
  );
};

export default CalendarHeader;