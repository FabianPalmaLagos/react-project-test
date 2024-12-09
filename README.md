# React Calendar Application

A modern, responsive calendar application built with React, inspired by Google Calendar and Outlook. This application provides a comprehensive interface for managing events and schedules with multiple view options.

## 🚀 Features

- **Multiple Calendar Views**
  - Month view with event indicators
  - Week view with hourly slots
  - Day view with detailed scheduling

- **Event Management**
  - Create new events with title and description
  - Set start and end times
  - View events across different calendar views

- **Navigation**
  - Easy switching between views (Month/Week/Day)
  - Navigate between time periods
  - Quick today navigation

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for different screen sizes
  - Touch-friendly interactions

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.x
- **Date Management**: date-fns
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js >= 14.x
- npm >= 6.x

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/FabianPalmaLagos/react-project-test.git
cd react-project-test
```

2. Install the dependencies:
```bash
npm install

# If you encounter any missing dependencies, run:
npm install react-scripts --save-dev
npm install date-fns @headlessui/react tailwindcss postcss autoprefixer
```

3. Start the development server:
```bash
npm start
```

## 👏 Quick Start

1. After installation, the application will run on `http://localhost:3000`
2. Create events by clicking the "Create Event" button
3. Switch between Month, Week, and Day views using the navigation buttons
4. Navigate between time periods using the arrow buttons

## 💡 Troubleshooting

### Common Issues:

1. **`react-scripts` not found:**
   ```bash
   npm install react-scripts --save-dev
   ```

2. **Missing dependencies:**
   ```bash
   npm install date-fns @headlessui/react tailwindcss postcss autoprefixer
   ```

3. **Module not found errors:**
   - Ensure all component files are in the correct directory structure
   - The project structure should match the one shown below

## 🏗️ Project Structure

```
src/
├── components/
│   └── Calendar/
│       ├── index.jsx        # Main Calendar component
│       ├── CalendarHeader.jsx   # Navigation and view controls
│       ├── MonthView.jsx    # Monthly calendar grid
│       ├── WeekView.jsx     # Weekly schedule view
│       ├── DayView.jsx      # Daily schedule view
│       └── EventModal.jsx   # Event creation/editing modal
├── App.jsx              # Main application component
└── index.js             # Application entry point
```

## 🎯 Usage

### Basic Implementation

```jsx
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Calendar />
    </div>
  );
}
```

### Event Data Structure

```javascript
{
  id: number,
  title: string,
  description: string,
  date: string, // 'YYYY-MM-DD'
  startTime: string, // 'HH:mm'
  endTime: string, // 'HH:mm'
}
```

## 🔄 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## 🛣️ Roadmap

- [ ] Drag and drop event management
- [ ] Event recurrence
- [ ] Multiple calendars support
- [ ] Calendar sharing
- [ ] Event notifications
- [ ] Data persistence
- [ ] User authentication

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [Fabian Palma Lagos] - Initial work - [FabianPalmaLagos](https://github.com/FabianPalmaLagos)

## 🙏 Acknowledgments

- Inspired by Google Calendar and Outlook
- Built with React and modern web technologies
- UI components powered by Tailwind CSS