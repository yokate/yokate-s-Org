import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Copy, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SqlEditor() {
  const [query, setQuery] = useState('SELECT * FROM orders LIMIT 10;');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runQuery = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const { data, error } = await (supabase as any).rpc('execute_sql', { query });
      if (error) throw error;
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error executing query');
    } finally {
      setLoading(false);
    }
  };

  const ResultView = () => {
    if (!result) return null;
    if (typeof result === 'string') return <div className="text-red-500">{result}</div>;
    if (!Array.isArray(result) || result.length === 0) return <div className="text-slate-500">No results found.</div>;

    const columns = Object.keys(result[0]);

    return (
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              {columns.map((col) => <th key={col} className="px-4 py-3">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {result.map((row: any, i: number) => (
              <tr key={i} className="bg-white border-b hover:bg-slate-50">
                {columns.map((col) => <td key={col} className="px-4 py-3">{String(row[col])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">SQL Editor</h2>
      </div>
      
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-40 p-4 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
        placeholder="SELECT * FROM table_name;"
      />
      
      <div className="flex items-center gap-4 mt-4">
        <button 
          onClick={runQuery}
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Executing...' : 'Run Query'}
        </button>
        {result && (
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result))} className="text-slate-500 hover:text-slate-800">
            <Copy className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Results:</h3>
          <ResultView />
        </div>
      )}
    </div>
  );
}
