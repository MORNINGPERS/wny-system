import React, { useState, useEffect } from 'react';
import { fetchAlumniByYear } from '../../services/api';

interface DetailsTableProps {
  onBack: () => void;
  selectedYear?: number;
}

export default function DetailsTable({ onBack, selectedYear }: DetailsTableProps) {
  const [alumniData, setAlumniData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlumniData = async () => {
      if (selectedYear) {
        try {
          const data = await fetchAlumniByYear(selectedYear.toString());
          setAlumniData(data.alumni || []);
        } catch (error) {
          console.error('Error loading alumni data:', error);
          setAlumniData([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadAlumniData();
  }, [selectedYear]);

  // Inline styles
  const styles = {
    detailsTable: {
      margin: '40px auto',
      maxWidth: '90%',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      borderRadius: '8px',
      overflow: 'hidden',
      textAlign: 'left' as const,
    },
    th: {
      backgroundColor: '#5A6DFE',
      color: 'white',
      padding: '12px',
      fontWeight: '600',
    },
    td: {
      padding: '12px',
    },
    trEven: {
      padding: '12px',
      backgroundColor: '#f9f9f9',
    },
    complete: {
      padding: '12px',
      color: '#0093D9',
      fontWeight: '600',
    },
    incomplete: {
      padding: '12px',
      color: '#E95D35',
      fontWeight: '600',
    },
    tableActions: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    backBtn: {
      padding: '8px 20px',
      background: '#ccc',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    sendBtn: {
      padding: '8px 20px',
      background: '#164B87',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    },
  };

  if (loading) {
    return (
      <div style={styles.detailsTable}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading alumni data...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.detailsTable}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Program Name</th>
            <th style={styles.th}>No.</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {alumniData.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                No alumni data found for this year.
              </td>
            </tr>
          ) : (
            alumniData.map((alumni, idx) => (
              <tr key={alumni.id} style={idx % 2 === 1 ? styles.trEven : undefined}>
                <td style={styles.td}>{alumni.course || ''}</td>
                <td style={styles.td}>{String(idx + 1).padStart(2, '0')}.</td>
                <td style={styles.td}>{alumni.name ? alumni.name.split(' ').slice(-1)[0] : ''}</td>
                <td style={styles.td}>{alumni.name ? alumni.name.split(' ')[0] : ''}</td>
                <td style={alumni.status === 'Employed' || alumni.status === 'High Position' || alumni.status === 'Absorb' ? styles.complete : styles.incomplete}>
                  {alumni.status || ''}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={styles.tableActions}>
        <button style={styles.backBtn} onClick={onBack}>Back</button>
        <button style={styles.sendBtn}>Send to Admin</button>
      </div>
    </div>
  );
}
