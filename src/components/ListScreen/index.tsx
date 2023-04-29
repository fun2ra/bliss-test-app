import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import TryAgain from "../TryAgain";
import BlissMockApiService from "../../services/BlissMockApiService";
import QuestionsList from "./QuestionsList";
import { QuestionType } from "../../interfaces";

const initialQuestion: QuestionType = {
  id: -1,
  image_url: "",
  published_at: "",
  question: "",
  thumb_url: "",
  choices: []
}

const ListScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  const [questionList, setQuestionList] = useState([initialQuestion])

  const checkServer = (): Promise<void> =>
    BlissMockApiService.checkServerHealth().then((response) => {
      setIsServerError(!response);
      setIsLoading(false);
    });

  useEffect(() => {
    checkServer();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    console.log('checking loading server...', isLoading)
    BlissMockApiService.getQuestions().then(response => {
      console.log(response)
      setQuestionList(response)
    })
  }, [isLoading])

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {isServerError ? (
            <TryAgain tryAgain={checkServer} />
          ) : (
            <QuestionsList questions={questionList} />
          )}
        </div>
      )}
    </div>
  );
};

export default ListScreen;
