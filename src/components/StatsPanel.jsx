import { useMemo } from 'react'
import { TrendingUp, Hash, Layers } from 'lucide-react'

function StatsPanel({ data }) {
  const stats = useMemo(() => {
    if (data.length === 0) return null

    const columns = Object.keys(data[0])
    const numericColumns = columns.filter(col => 
      typeof data[0][col] === 'number'
    )

    const statsData = {}

    numericColumns.forEach(col => {
      const values = data.map(row => row[col]).filter(val => typeof val === 'number')
      const sum = values.reduce((a, b) => a + b, 0)
      const mean = sum / values.length
      const sorted = [...values].sort((a, b) => a - b)
      const min = sorted[0]
      const max = sorted[sorted.length - 1]

      statsData[col] = {
        sum,
        mean: mean.toFixed(2),
        min,
        max,
        count: values.length
      }
    })

    // Category counts
    const categoricalColumns = columns.filter(col => 
      typeof data[0][col] === 'string'
    )

    const categoryStats = {}
    categoricalColumns.forEach(col => {
      const counts = {}
      data.forEach(row => {
        const value = row[col]
        counts[value] = (counts[value] || 0) + 1
      })
      categoryStats[col] = counts
    })

    return { statsData, categoryStats, columns }
  }, [data])

  if (!stats) return null

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2 className="card-title">
          <Hash size={20} className="card-icon" />
          Numeric Statistics
        </h2>
        <div style={{ marginTop: '20px' }}>
          {Object.keys(stats.statsData).length === 0 ? (
            <p style={{ color: '#718096' }}>No numeric columns found</p>
          ) : (
            Object.entries(stats.statsData).map(([col, colStats]) => (
              <div key={col} style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '10px', fontWeight: 600 }}>
                  {col}
                </h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{colStats.sum.toLocaleString()}</div>
                    <div className="stat-label">Total</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{colStats.mean}</div>
                    <div className="stat-label">Average</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{colStats.min.toLocaleString()}</div>
                    <div className="stat-label">Min</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{colStats.max.toLocaleString()}</div>
                    <div className="stat-label">Max</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">
          <Layers size={20} className="card-icon" />
          Category Distribution
        </h2>
        <div style={{ marginTop: '20px' }}>
          {Object.keys(stats.categoryStats).length === 0 ? (
            <p style={{ color: '#718096' }}>No categorical columns found</p>
          ) : (
            Object.entries(stats.categoryStats).map(([col, counts]) => (
              <div key={col} style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '10px', fontWeight: 600 }}>
                  {col}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([value, count]) => (
                      <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ 
                          flex: '0 0 120px',
                          fontSize: '13px',
                          color: '#4a5568',
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {value}
                        </div>
                        <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '4px', height: '24px', position: 'relative' }}>
                          <div style={{
                            width: `${(count / data.length) * 100}%`,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            height: '100%',
                            borderRadius: '4px',
                            transition: 'width 0.3s'
                          }} />
                        </div>
                        <div style={{ flex: '0 0 60px', textAlign: 'right', fontSize: '13px', color: '#718096' }}>
                          {count} ({((count / data.length) * 100).toFixed(1)}%)
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">
          <TrendingUp size={20} className="card-icon" />
          Dataset Overview
        </h2>
        <div className="stats-grid" style={{ marginTop: '20px' }}>
          <div className="stat-item">
            <div className="stat-value">{data.length}</div>
            <div className="stat-label">Total Rows</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.columns.length}</div>
            <div className="stat-label">Columns</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(stats.statsData).length}</div>
            <div className="stat-label">Numeric Fields</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Object.keys(stats.categoryStats).length}</div>
            <div className="stat-label">Text Fields</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
