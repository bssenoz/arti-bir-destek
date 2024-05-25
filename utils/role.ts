import jwt_decode from 'jwt-decode';

export const getUserRoleFromToken = (): string | undefined => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as Record<string, unknown>;
      const role = decodedToken.role as string | undefined;
      if (role && (role === 'Admin' || role === 'Patient' || role === 'Doctor')) {
        return role;
      } else {
        console.error('Geçersiz rol: ', role);
        return undefined;
      }
    }
    console.error('Access token bulunamadı veya null.');
    return undefined;
  };
  