import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { ChartType } from '../types';

interface ChartProps {
  type: ChartType;
  data: any[];
  title?: string;
  width?: number;
  height?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const Chart = ({ type, data, title, height = 300 }: ChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="X" />
              <YAxis dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Data" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'heatmap':
        // For heatmap, we'll use a simple color-coded grid
        return (
          <div className="grid gap-1 p-4" style={{ height }}>
            {data.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.values?.map((val: number, j: number) => (
                  <div
                    key={j}
                    className="flex-1 flex items-center justify-center text-xs font-medium text-white"
                    style={{
                      backgroundColor: `rgba(136, 132, 216, ${val / 100})`,
                      minHeight: '40px',
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      default:
        return <div className="p-4 text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-2 px-4">{title}</h3>}
      {renderChart()}
    </div>
  );
};
