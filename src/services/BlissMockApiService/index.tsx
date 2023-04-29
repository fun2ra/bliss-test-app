import axios from "axios";
import { QuestionType } from "../../interfaces";

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
  getQuestions: async (): Promise<QuestionType[]> => {
    const questionsList = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.questions}`
    );

    return new Promise((resolve) =>
      resolve(
        questionsList.data.map((question: any) => {
          return {
            key: question.id,
            ...question,
          };
        })
      )
    );
  },
  getQuestionById: async (question_id: number): Promise<QuestionType> => {
    const questionById = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.questions}/${question_id}`
    );

    return new Promise((resolve) => resolve(questionById.data));
  },
  updateQuestion: async (
    question_id: number,
    data: QuestionType
  ): Promise<any> => {
    const updateQuestionById = await axios.put(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.questions}/${question_id}`,
      data
    );

    return new Promise((resolve) => resolve(updateQuestionById.data));
  },
};

export default ApiService;
