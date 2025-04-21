const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fonction générique pour appeler l’API
 */
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.detail || 'Erreur API');
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

//
// 🔐 Authentification
//
export function login(credentials) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function register(data) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

//
// 👤 Clients
//
export function getClients() {
  return apiFetch('/clients');
}

export function createClient(clientData) {
  return apiFetch('/clients', {
    method: 'POST',
    body: JSON.stringify(clientData),
  });
}

export function deleteClient(id) {
  return apiFetch(`/clients/${id}`, {
    method: 'DELETE',
  });
}

//
// 📺 Décodeurs
//
export function getDecodersForClient(clientId) {
  return apiFetch(`/clients/${clientId}/decoders`);
}

export function addDecoderToClient(clientId, decoderData) {
  return apiFetch(`/clients/${clientId}/decoders`, {
    method: 'POST',
    body: JSON.stringify(decoderData),
  });
}

export function removeDecoderFromClient(clientId, decoderId) {
  return apiFetch(`/clients/${clientId}/decoders/${decoderId}`, {
    method: 'DELETE',
  });
}

export function restartDecoder(decoderId) {
  return apiFetch(`/decoders/${decoderId}/restart`, {
    method: 'POST',
  });
}

export function getDecoderStatus(decoderId) {
  return apiFetch(`/decoders/${decoderId}/status`);
}

//
// 📡 Chaînes
//
export function addChannel(decoderId, channelData) {
  return apiFetch(`/decoders/${decoderId}/channels`, {
    method: 'POST',
    body: JSON.stringify(channelData),
  });
}

export function removeChannel(decoderId, channelId) {
  return apiFetch(`/decoders/${decoderId}/channels/${channelId}`, {
    method: 'DELETE',
  });
}
