import React, { useState, useEffect } from 'react';

const colors = {
  bg: '#f6f8fa',
  card: '#fff',
  accent: '#0077ff',
  accentLight: '#e3f0ff',
  text: '#222',
  border: '#e0e0e0',
  error: '#d32f2f',
  success: '#388e3c',
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: colors.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  card: {
    background: colors.card,
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: 32,
    minWidth: 350,
    maxWidth: 420,
    width: '100%',
    border: `1px solid ${colors.border}`,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.accent,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: 12,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    fontSize: 16,
    outline: 'none',
    background: colors.bg,
    transition: 'border 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: 12,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    fontSize: 16,
    outline: 'none',
    background: colors.bg,
    minHeight: 60,
    resize: 'vertical',
    transition: 'border 0.2s',
  },
  button: {
    width: '100%',
    padding: '12px 0',
    borderRadius: 8,
    border: 'none',
    background: colors.accent,
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 8,
    transition: 'background 0.2s',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: colors.accent,
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 15,
    marginLeft: 4,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 16,
    fontSize: 15,
  },
  th: {
    background: colors.accentLight,
    color: colors.accent,
    fontWeight: 600,
    padding: '8px 6px',
    border: `1px solid ${colors.border}`,
  },
  td: {
    padding: '8px 6px',
    border: `1px solid ${colors.border}`,
    background: colors.card,
    color: colors.text,
  },
  error: {
    color: colors.error,
    marginBottom: 8,
    textAlign: 'center',
  },
  success: {
    color: colors.success,
    marginBottom: 8,
    textAlign: 'center',
  },
  logoutBtn: {
    marginTop: 16,
    background: colors.accentLight,
    color: colors.accent,
    border: 'none',
    borderRadius: 8,
    padding: '8px 0',
    width: '100%',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 16,
  },
};

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function getLogs() {
  return JSON.parse(localStorage.getItem('logs') || '[]');
}
function saveLogs(logs) {
  localStorage.setItem('logs', JSON.stringify(logs));
}

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  // Hasaba alyş
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMsg, setRegMsg] = useState('');

  // Giriş
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  // Wagt bellegi we hasabat
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [report, setReport] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  // Taryh
  const [logs, setLogs] = useState([]);

  // Ulanyjyny hasaba almak
  const handleRegister = (e) => {
    e.preventDefault();
    setRegMsg('');
    const users = getUsers();
    if (users.find(u => u.email === regEmail)) {
      setRegMsg('Email eýýäm hasaba alnan');
      return;
    }
    const newUser = {
      id: Date.now().toString(),
      name: regName,
      email: regEmail,
      password: regPassword,
    };
    users.push(newUser);
    saveUsers(users);
    setRegMsg('Ulanyjy hasaba alyndy');
    setPage('login');
  };

  // Ulanyjy Giriş
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginMsg('');
    const users = getUsers();
    const found = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (found) {
      setUser(found);
      setPage('dashboard');
    } else {
      setLoginMsg('Nädogry maglumatlar');
    }
  };

  // Wagt belgisini we hasabat goşmak
  const handleTimeLog = (e) => {
    e.preventDefault();
    setTimeMsg('');
    const logs = getLogs();
    logs.push({
      id: Date.now().toString(),
      userId: user.id,
      date,
      start,
      end,
      report,
    });
    saveLogs(logs);
    setTimeMsg('Bellik goşuldy');
    setDate('');
    setStart('');
    setEnd('');
    setReport('');
    fetchLogs();
  };

  // Taryhy almak
  const fetchLogs = () => {
    if (!user) return;
    const logs = getLogs().filter(log => log.userId === user.id);
    setLogs(logs);
  };

  useEffect(() => {
    if (user) fetchLogs();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.title}>Begenc Suhanov WorkTime Tracker</div>
        <div style={styles.subtitle}>
          Işgärleriň wagtyny we işini hasaba alyan ulgam
        </div>

        {page === 'register' && (
          <form onSubmit={handleRegister}>
            <input
              style={styles.input}
              type="text"
              placeholder="Ady"
              value={regName}
              onChange={e => setRegName(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Parol"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              required
            />
            <button style={styles.button} type="submit">Hasaba al</button>
            {regMsg && <div style={styles.success}>{regMsg}</div>}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              Eýýäm hasabyňyz barmy?
              <button style={styles.linkBtn} type="button" onClick={() => setPage('login')}>Gir</button>
            </div>
          </form>
        )}

        {page === 'login' && (
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Parol"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
            />
            <button style={styles.button} type="submit">Gir</button>
            {loginMsg && <div style={styles.error}>{loginMsg}</div>}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              Hasabyňyz ýokmy?
              <button style={styles.linkBtn} type="button" onClick={() => setPage('register')}>Hasaba alyş</button>
            </div>
          </form>
        )}

        {page === 'dashboard' && user && (
          <div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: colors.text }}>
              Salam, {user.name}!
            </div>
            <form onSubmit={handleTimeLog}>
              <input
                style={styles.input}
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
              <input
                style={styles.input}
                type="time"
                value={start}
                onChange={e => setStart(e.target.value)}
                required
              />
              <input
                style={styles.input}
                type="time"
                value={end}
                onChange={e => setEnd(e.target.value)}
                required
              />
              <textarea
                style={styles.textarea}
                placeholder="Iş hasabaty"
                value={report}
                onChange={e => setReport(e.target.value)}
                required
              />
              <button style={styles.button} type="submit">Ýatda sakla</button>
            </form>
            {timeMsg && <div style={styles.success}>{timeMsg}</div>}
            <button style={styles.logoutBtn} onClick={() => { setUser(null); setPage('login'); }}>Çykmak</button>

            <div style={{ marginTop: 32, fontWeight: 600, fontSize: 17, color: colors.accent }}>
              Belligiň taryhy
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Sene</th>
                  <th style={styles.th}>Gelen wagty</th>
                  <th style={styles.th}>Gaýdan wagty</th>
                  <th style={styles.th}>Hasabat</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id}>
                    <td style={styles.td}>{log.date}</td>
                    <td style={styles.td}>{log.start}</td>
                    <td style={styles.td}>{log.end}</td>
                    <td style={styles.td}>{log.report}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
