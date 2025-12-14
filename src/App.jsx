import { useState, useEffect } from 'react'
import { BarChart3, LineChart, PieChart, Upload, Download, Share2, Database } from 'lucide-react'
import DataUploader from './components/DataUploader'
import ChartBuilder from './components/ChartBuilder'
import DataExplorer from './components/DataExplorer'
import StatsPanel from './components/StatsPanel'

function App() {
  const [data, setData] = useState([])
  const [fileName, setFileName] = useState('')
  const [activeView, setActiveView] = useState('upload')

  const handleDataLoad = (parsedData, name) => {
    setData(parsedData)
    setFileName(name)
    setActiveView('explore')
  }

  const handleExport = (format) => {
    if (data.length === 0) return

    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName || 'data'}-export.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share && data.length > 0) {
      navigator.share({
        title: 'Analytics Dashboard Data',
        text: `Check out this data from ${fileName}`,
      }).catch(() => {
        // Fallback: copy to clipboard
        alert('Share functionality: Copy the URL or export the data to share with your team.')
      })
    } else {
      alert('Share this dashboard by copying the URL or exporting your data!')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>📊 Smart Analytics Dashboard</h1>
        <p>Explore data, build charts, and share insights with your team</p>
      </header>

      {data.length === 0 ? (
        <DataUploader onDataLoad={handleDataLoad} />
      ) : (
        <>
          <div className="control-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ marginBottom: '5px', color: '#2d3748' }}>Current Dataset: {fileName}</h3>
                <p style={{ fontSize: '14px', color: '#718096' }}>{data.length} rows loaded</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" onClick={() => setData([])}>
                  <Upload size={16} />
                  Load New Data
                </button>
                <button className="btn btn-secondary" onClick={() => handleExport('json')}>
                  <Download size={16} />
                  Export
                </button>
                <button className="btn btn-primary" onClick={handleShare}>
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div className="chart-type-selector">
              <button
                className={`chart-type-btn ${activeView === 'explore' ? 'active' : ''}`}
                onClick={() => setActiveView('explore')}
              >
                <Database size={16} />
                Data Explorer
              </button>
              <button
                className={`chart-type-btn ${activeView === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveView('stats')}
              >
                <BarChart3 size={16} />
                Statistics
              </button>
              <button
                className={`chart-type-btn ${activeView === 'charts' ? 'active' : ''}`}
                onClick={() => setActiveView('charts')}
              >
                <LineChart size={16} />
                Build Charts
              </button>
            </div>
          </div>

          {activeView === 'explore' && <DataExplorer data={data} />}
          {activeView === 'stats' && <StatsPanel data={data} />}
          {activeView === 'charts' && <ChartBuilder data={data} />}
        </>
      )}
    </div>
  )
}

export default App
