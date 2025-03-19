const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
  
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(atob(base64));
  
      return decodedData.userId || decodedData.id; // Ensure backend includes userId
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  
  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
  
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(atob(base64));
  
      return decodedData.username; // Extract username
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  
  const JWT_Decoder = {
    getUserIdFromToken,
    getUsernameFromToken,
  };
  
  export default JWT_Decoder;
  
  