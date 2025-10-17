
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 debería ser más estricto 
 * - El balance entre seguridad y usabilidad
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};


