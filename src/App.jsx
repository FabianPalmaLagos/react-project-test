import React from 'react';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Calendar />
      </div>
    </div>
  );
}

export default App;