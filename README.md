# 📊 Smart Analytics Dashboard

A sleek, self-serve analytics dashboard to explore data, build charts, and share insights with your team.

## ✨ Features

- **📁 Easy Data Import**: Upload CSV or JSON files with drag-and-drop support
- **🔍 Data Explorer**: Browse and search through your data with pagination
- **📈 Interactive Charts**: Build beautiful visualizations with multiple chart types:
  - Bar Charts
  - Line Charts
  - Area Charts
  - Pie Charts
  - Scatter Plots
- **📊 Statistics Panel**: Get instant insights with automated statistical analysis
- **💾 Export & Share**: Download your data and share insights with your team
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **📱 Responsive**: Works great on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manojsai7/smart-analytics-dashboard.git
cd smart-analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Uploading Data

1. **Sample Data**: Click "Load Sample Data" to try the dashboard with pre-loaded data
2. **Upload File**: Drag and drop a CSV or JSON file, or click to browse
3. **File Formats**:
   - CSV: Must have headers in the first row
   - JSON: Array of objects with consistent keys

### Exploring Data

- Use the **Data Explorer** tab to browse your dataset
- Search across all fields using the search box
- Navigate through pages for large datasets

### Viewing Statistics

- Switch to the **Statistics** tab to see:
  - Numeric column statistics (sum, average, min, max)
  - Category distributions with visual bars
  - Dataset overview

### Building Charts

1. Go to the **Build Charts** tab
2. Select a chart type (Bar, Line, Area, Pie, or Scatter)
3. Choose your X-axis (any column)
4. Choose your Y-axis (numeric columns)
5. Optionally group data by a categorical field
6. Your chart updates instantly!

### Exporting & Sharing

- Click **Export** to download your data as JSON
- Click **Share** to share insights with your team

## 🛠️ Technologies Used

- **React** - UI framework
- **Vite** - Fast build tool
- **Recharts** - Charting library
- **PapaParse** - CSV parsing
- **Lucide React** - Icon library

## 📦 Project Structure

```
smart-analytics-dashboard/
├── src/
│   ├── components/
│   │   ├── ChartBuilder.jsx    # Chart building component
│   │   ├── DataExplorer.jsx    # Data browsing component
│   │   ├── DataUploader.jsx    # File upload component
│   │   └── StatsPanel.jsx      # Statistics display
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── sample-data.csv             # Sample dataset

## 🎯 Use Cases

- **Business Analytics**: Analyze sales data, customer metrics, and KPIs
- **Data Exploration**: Quickly explore and visualize datasets
- **Team Collaboration**: Share data insights with your team
- **Report Generation**: Create visual reports from raw data
- **Educational**: Learn data visualization and analysis

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

ISC

## 👨‍💻 Author

Created with ❤️ for data enthusiasts
