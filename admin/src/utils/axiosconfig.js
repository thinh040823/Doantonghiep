const getTokenFromLocalStorage = sessionStorage.getItem('user') 
    ? JSON.parse(sessionStorage.getItem('user')) 
    : null

export const config = {
    headers: {
        Authorization : `Bearer ${getTokenFromLocalStorage?.token}`,
        Accept : "application/json",
    }
}