const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function buildHeaders(token, extra){
  return {
    'Content-Type':'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra
  };
}

async function request(path, { method='GET', token, body, headers } = {}){
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: buildHeaders(token, headers),
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (networkErr){
    // Network-level errors (CORS, offline, DNS, refused connection)
    throw new Error('Network error: failed to reach API');
  }
  let data = {};
  try { data = await res.json(); } catch { /* ignore parse errors */ }
  if(!res.ok){
    const message = data.error || data.message || `${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  auth: {
    register: (payload) => request('/auth/register', { method:'POST', body: payload }),
    login: (payload) => request('/auth/login', { method:'POST', body: payload }),
  },
  admin: {
    createUser: (token, payload) => request('/admin/users', { method:'POST', token, body: payload }),
    updateUser: (token, id, payload) => request(`/admin/users/${id}`, { method:'PATCH', token, body: payload }),
    deleteUser: (token, id) => request(`/admin/users/${id}`, { method:'DELETE', token }),
    pendingUsers: (token) => request('/admin/pending-users', { token }),
    approveUser: (token, id) => request(`/admin/approve-user/${id}`, { method:'PATCH', token }),
    rejectUser: (token, id) => request(`/admin/reject-user/${id}`, { method:'DELETE', token }),
    listUsers: (token) => request('/admin/users', { token }),
    updateRole: (token, id, role) => request(`/admin/users/${id}/role`, { method:'PATCH', token, body:{ role } }),
    deactivateUser: (token, id) => request(`/admin/users/${id}/deactivate`, { method:'PATCH', token }),
    systemConfigGet: (token) => request('/admin/system/config', { token }),
    systemConfigUpdate: (token, changes) => request('/admin/system/config', { method:'PUT', token, body: changes }),
    accessReport: (token) => request('/admin/reports/access', { token }),
    runBackup: (token) => request('/admin/backups/run', { token }),
    restoreBackup: (token) => request('/admin/backups/restore', { token }),
    sendAnnouncement: (token, payload) => request('/admin/announcements', { method:'POST', token, body: payload }),
    configureAlerts: (token, payload) => request('/admin/alerts/config', { method:'POST', token, body: payload }),
  },
  access: {
    generateText: (token) => request('/access/generate/text', { method:'POST', token }),
    generateQR: (token) => request('/access/generate/qr', { method:'POST', token }),
    checkIn: (token, code) => request('/access/checkin', { method:'POST', token, body:{ code } }),
  },
  roles: {
    listRoles: (token) => request('/roles', { token }),
    getRoleById: (token, id) => request(`/roles/${id}`, { token }),
    createRole: (token, payload) => request('/roles', { method:'POST', token, body: payload }),
    updateRole: (token, id, payload) => request(`/roles/${id}`, { method:'PATCH', token, body: payload }),
    deleteRole: (token, id) => request(`/roles/${id}`, { method:'DELETE', token }),
  }
};
