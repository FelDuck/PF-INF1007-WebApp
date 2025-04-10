/**
 * Enregistre le token JWT dans localStorage
 */
export function saveToken(token) {
    localStorage.setItem('token', token);
  }
  
  /**
   * Récupère le token JWT depuis localStorage
   */
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  /**
   * Supprime le token JWT de localStorage
   */
  export function removeToken() {
    localStorage.removeItem('token');
  }
  
  /**
   * Vérifie si un utilisateur est connecté
   */
  export function isAuthenticated() {
    const token = getToken();
  
    // Optionnel : tu peux ajouter une vérification d’expiration ici
    return !!token;
  }
  