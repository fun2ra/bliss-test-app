import axios from "axios";

const ApiUrls = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  endpoints: {
    health: "/health",
  },
};

const ApiService = {
  checkServerHealth: async (): Promise<boolean> => {
    const serverHealth = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.health}`
    );

    return new Promise((resolve) => resolve(serverHealth.data?.status === "OK"));
  },
};

export default ApiService;
