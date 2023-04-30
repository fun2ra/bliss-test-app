import axios from "axios";
import { QuestionType } from "../../interfaces";

const ApiUrls = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  hostUrl: process.env.REACT_APP_HOST,
  endpoints: {
    health: "/health",
    questions: "/questions",
    share: "/share",
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

  getQuestions: async (limit: number = 10, offset:number = 0, filter?: string): Promise<QuestionType[]> => {
    const questionsList = await axios.get(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.questions}?limit=${limit}&offset=${offset}${!!filter?`&filter=${filter}`:``}`
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

  shareQuestionByEmail: async (
    destination_email: string,
    pathname: string
  ): Promise<boolean> => {
    const content_url = `${ApiUrls.hostUrl}${pathname}`;
    console.log(content_url);
    const shareQuestion = await axios.post(
      `${ApiUrls.baseUrl}/${ApiUrls.endpoints.share}?destination_email=${destination_email}&content_url=${content_url}`
    );

    return new Promise((resolve) =>
      resolve(shareQuestion.data?.status === "OK")
    );
  },
};

export default ApiService;
