import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'

function DataExplorer({ data }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const columns = useMemo(() => {
    if (data.length === 0) return []
    return Object.keys(data[0])
  }, [data])

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    
    return data.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [data, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Filter size={20} className="card-icon" />
          Data Explorer
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={18} color="#718096" />
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              padding: '8px 12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              width: '250px'
            }}
          />
        </div>
      </div>

      <p style={{ marginBottom: '15px', color: '#718096', fontSize: '14px' }}>
        Showing {paginatedData.length} of {filteredData.length} rows
      </p>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>{String(row[col] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ color: '#718096' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default DataExplorer
