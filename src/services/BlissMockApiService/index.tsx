import axios from "axios";

const ApiUrls = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  endpoints: {
    health: "/health",
    questions: "/questions",
  },
};

const ApiService = {
  checkServerHealth: async (): Promise<boolean> => {
    const serverHealth = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.health}`
    );

    return new Promise((resolve) =>
      resolve(serverHealth.data?.status === "OK")
    );
  },
  getQuestions: async (): Promise<any> => {
    const questionsList = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.questions}`
    );

    return new Promise((resolve) => resolve(questionsList.data))
  }
};

export default ApiService;
