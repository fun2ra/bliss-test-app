import React, { useEffect, useState, useMemo, useCallback } from "react";
import BlissMockApiService from "../../services/BlissMockApiService";
import { QuestionType, ChoicesType } from "../../interfaces";
import LoadingScreen from "../LoadingScreen";
import { Image, Tooltip } from "antd";
import { LikeOutlined, ShareAltOutlined } from "@ant-design/icons";

const initialQuestion: QuestionType = {
  key: -1,
  image_url: "",
  published_at: "",
  question: "",
  thumb_url: "",
  choices: [],
};

const DetailScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionDetail, setQuestionDetail] = useState(initialQuestion);

  useEffect(() => {
    BlissMockApiService.getQuestionById(1).then((response) => {
      setQuestionDetail(response);
      setIsLoading(false);
    });
  }, []);

  const questionDate = useMemo(
    () => new Date(questionDetail.published_at).toLocaleDateString(),
    [questionDetail.published_at]
  );

  const onVote = useCallback(
    (ch: ChoicesType) => {
      console.log(ch);
      const updatedQuestion = {
        ...questionDetail,
        choices: questionDetail.choices.map((chx) => {
          if (chx.choice === ch.choice) {
            return { ...chx, votes: ch.votes + 1 };
          } else {
            return { ...chx };
          }
        }),
      };
      console.log(updatedQuestion);
      BlissMockApiService.updateQuestion(
        questionDetail.key,
        updatedQuestion
      ).then((response) => setQuestionDetail(updatedQuestion));
    },
    [questionDetail]
  );

  return (
    <div className="question-detail">
      {isLoading ? (
        <LoadingScreen text="Loading question's detail..." />
      ) : (
        <div>
          <div className="question-card">
            <Image
              src={questionDetail.image_url}
              width={200}
              style={{ border: "solid 2px #1890ff", borderRadius: "4px" }}
            />
            <div>
              <div className="question-name">{questionDetail.question}</div>
              <div className="question-date">Published at: {questionDate}</div>
              <div className="choices-list">
                {questionDetail.choices.map((ch, i) => (
                  <div key={i}>
                    <div className="choice-name">{ch.choice} </div>
                    <div className="choice-votes">
                      <div>votes: {ch.votes}</div>
                      <Tooltip title="vote your self for this answer">
                        <LikeOutlined
                          onClick={() => onVote(ch)}
                          style={{
                            color: "#1890ff",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="share-question">
            <ShareAltOutlined />
            <div>Share this question with a friend</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
