import { useState, useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Activity } from 'lucide-react'

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0']

function ChartBuilder({ data }) {
  const [chartType, setChartType] = useState('bar')
  const [xAxis, setXAxis] = useState('')
  const [yAxis, setYAxis] = useState('')
  const [groupBy, setGroupBy] = useState('')

  const columns = useMemo(() => {
    if (data.length === 0) return []
    return Object.keys(data[0])
  }, [data])

  const numericColumns = useMemo(() => {
    if (data.length === 0) return []
    return columns.filter(col => typeof data[0][col] === 'number')
  }, [columns, data])

  const categoricalColumns = useMemo(() => {
    if (data.length === 0) return []
    return columns.filter(col => typeof data[0][col] === 'string')
  }, [columns, data])

  const chartData = useMemo(() => {
    if (!xAxis || !yAxis) return []

    if (groupBy) {
      // Group data by groupBy field and aggregate
      const grouped = {}
      data.forEach(row => {
        const key = `${row[xAxis]}_${row[groupBy]}`
        if (!grouped[key]) {
          grouped[key] = {
            [xAxis]: row[xAxis],
            [groupBy]: row[groupBy],
            [yAxis]: 0,
            count: 0
          }
        }
        grouped[key][yAxis] += Number(row[yAxis]) || 0
        grouped[key].count += 1
      })
      return Object.values(grouped)
    } else {
      // Simple aggregation by x-axis
      const aggregated = {}
      data.forEach(row => {
        const key = row[xAxis]
        if (!aggregated[key]) {
          aggregated[key] = {
            [xAxis]: key,
            [yAxis]: 0,
            count: 0
          }
        }
        aggregated[key][yAxis] += Number(row[yAxis]) || 0
        aggregated[key].count += 1
      })
      return Object.values(aggregated)
    }
  }, [data, xAxis, yAxis, groupBy])

  const renderChart = () => {
    if (!xAxis || !yAxis || chartData.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#718096' }}>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>Select axes to build your chart</p>
          <p style={{ fontSize: '14px' }}>Choose X and Y axis fields from the dropdowns above</p>
        </div>
      )
    }

    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxis} stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey={yAxis} fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxis} stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yAxis} 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ fill: '#667eea', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxis} stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={yAxis} 
                stroke="#667eea" 
                fill="#667eea"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData.slice(0, 8)}
                dataKey={yAxis}
                nameKey={xAxis}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={(entry) => `${entry[xAxis]}: ${entry[yAxis]}`}
              >
                {chartData.slice(0, 8).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxis} stroke="#718096" />
              <YAxis dataKey={yAxis} stroke="#718096" />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Legend />
              <Scatter name={`${xAxis} vs ${yAxis}`} data={chartData} fill="#667eea" />
            </ScatterChart>
          </ResponsiveContainer>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="card">
      <h2 className="card-title" style={{ marginBottom: '20px' }}>
        <BarChart3 size={20} className="card-icon" />
        Chart Builder
      </h2>

      <div className="filters">
        <div className="filter-item">
          <label>Chart Type</label>
          <div className="chart-type-selector" style={{ marginTop: '8px' }}>
            <button
              className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
            >
              <BarChart3 size={16} />
              Bar
            </button>
            <button
              className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
            >
              <LineChartIcon size={16} />
              Line
            </button>
            <button
              className={`chart-type-btn ${chartType === 'area' ? 'active' : ''}`}
              onClick={() => setChartType('area')}
            >
              <Activity size={16} />
              Area
            </button>
            <button
              className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon size={16} />
              Pie
            </button>
            <button
              className={`chart-type-btn ${chartType === 'scatter' ? 'active' : ''}`}
              onClick={() => setChartType('scatter')}
            >
              Scatter
            </button>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-item">
          <label>X-Axis</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
          >
            <option value="">Select column...</option>
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Y-Axis (Numeric)</label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
          >
            <option value="">Select column...</option>
            {numericColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Group By (Optional)</label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="">None</option>
            {categoricalColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>

      {chartData.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', color: '#4a5568' }}>
            <strong>Chart Info:</strong> Displaying {chartData.length} data points
            {groupBy && ` grouped by ${groupBy}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default ChartBuilder
