import { useState } from 'react'
import Papa from 'papaparse'
import { Upload, FileText } from 'lucide-react'

function DataUploader({ onDataLoad }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file) => {
    if (!file) return

    const reader = new FileReader()
    
    if (file.name.endsWith('.csv')) {
      reader.onload = (e) => {
        Papa.parse(e.target.result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              onDataLoad(results.data, file.name)
            } else {
              alert('No data found in the file')
            }
          },
          error: (error) => {
            alert('Error parsing CSV: ' + error.message)
          }
        })
      }
      reader.readAsText(file)
    } else if (file.name.endsWith('.json')) {
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result)
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData]
          onDataLoad(dataArray, file.name)
        } catch (error) {
          alert('Error parsing JSON: ' + error.message)
        }
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a CSV or JSON file')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const loadSampleData = () => {
    const sampleData = [
      { product: 'Laptop', category: 'Electronics', sales: 1200, revenue: 960000, month: 'Jan' },
      { product: 'Smartphone', category: 'Electronics', sales: 2500, revenue: 1250000, month: 'Jan' },
      { product: 'Headphones', category: 'Electronics', sales: 800, revenue: 80000, month: 'Jan' },
      { product: 'Desk', category: 'Furniture', sales: 300, revenue: 90000, month: 'Jan' },
      { product: 'Chair', category: 'Furniture', sales: 450, revenue: 67500, month: 'Jan' },
      { product: 'Laptop', category: 'Electronics', sales: 1350, revenue: 1080000, month: 'Feb' },
      { product: 'Smartphone', category: 'Electronics', sales: 2700, revenue: 1350000, month: 'Feb' },
      { product: 'Headphones', category: 'Electronics', sales: 950, revenue: 95000, month: 'Feb' },
      { product: 'Desk', category: 'Furniture', sales: 320, revenue: 96000, month: 'Feb' },
      { product: 'Chair', category: 'Furniture', sales: 500, revenue: 75000, month: 'Feb' },
      { product: 'Laptop', category: 'Electronics', sales: 1100, revenue: 880000, month: 'Mar' },
      { product: 'Smartphone', category: 'Electronics', sales: 2300, revenue: 1150000, month: 'Mar' },
      { product: 'Headphones', category: 'Electronics', sales: 720, revenue: 72000, month: 'Mar' },
      { product: 'Desk', category: 'Furniture', sales: 280, revenue: 84000, month: 'Mar' },
      { product: 'Chair', category: 'Furniture', sales: 420, revenue: 63000, month: 'Mar' },
    ]
    onDataLoad(sampleData, 'sample-data.json')
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="card-title" style={{ marginBottom: '20px' }}>
        <Upload size={24} className="card-icon" />
        Upload Your Data
      </h2>
      
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="upload-icon">
          <FileText size={48} />
        </div>
        <p className="upload-text">Drag and drop your file here or click to browse</p>
        <p className="upload-hint">Supports CSV and JSON files</p>
      </div>

      <input
        id="fileInput"
        type="file"
        accept=".csv,.json"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: '#718096', marginBottom: '10px' }}>Or try with sample data</p>
        <button className="btn btn-primary" onClick={loadSampleData}>
          Load Sample Data
        </button>
      </div>
    </div>
  )
}

export default DataUploader
