import React, { useEffect, useState, useMemo, useCallback } from "react";
import BlissMockApiService from "../../services/BlissMockApiService";
import { ChoicesType, ShareFormType } from "../../interfaces";
import LoadingScreen from "../LoadingScreen";
import { Image, Tooltip, Button, Modal, Form, Input, message } from "antd";
import {
  PlusCircleOutlined,
  ShareAltOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { mockInitialQuestion as initialQuestion } from "../../mockData";

const validationMessage = {
  required: "${label} is required!",
  types: {
    email: "This is not a valid email!",
  },
};

const DetailScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionDetail, setQuestionDetail] = useState(initialQuestion);
  const [isShare, setIsShare] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

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

  const handleVote = useCallback(
    (ch: ChoicesType) => {
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
      BlissMockApiService.updateQuestion(
        questionDetail.key,
        updatedQuestion
      ).then((response) => {
        // here backend it's not working properly, insted of render updatedQuestion object should be used response
        setQuestionDetail(updatedQuestion);
      });
    },
    [questionDetail]
  );

  const handleShare = useCallback(
    (form: ShareFormType) => {
      setIsShareLoading(true);
      BlissMockApiService.shareQuestionByEmail(form.email, pathname).then(
        (response) => {
          if (response === true) {
            messageApi.success("Question shared successfully");
          } else {
            messageApi.error("Some error occurred");
          }
          setIsShareLoading(false);
          setIsShare(false);
        }
      );
    },
    [BlissMockApiService.shareQuestionByEmail]
  );

  return (
    <div className="question-detail">
      {isLoading ? (
        <LoadingScreen text="Loading question's detail..." />
      ) : (
        <div>
          <Button
            onClick={() => navigate("/questions")}
            icon={<ArrowLeftOutlined type="link" />}
          >
            Back
          </Button>
          <div className="question-card">
            <Image
              src={questionDetail.image_url}
              width={200}
              className="question-image"
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
                        <PlusCircleOutlined
                          onClick={() => handleVote(ch)}
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
            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={() => setIsShare(true)}
            >
              Share this question with a friend
            </Button>
            <Modal
              title="Share question"
              open={isShare}
              onCancel={() => setIsShare(false)}
              footer={[
                <Button onClick={() => setIsShare(false)}>Cancel</Button>,
                <Button
                  type="primary"
                  form="shareForm"
                  key="submit"
                  htmlType="submit"
                  icon={isShareLoading && <LoadingOutlined />}
                >
                  Submit
                </Button>,
              ]}
            >
              {contextHolder}
              <div className="share-title">Enter the email of your friend</div>
              <Form
                validateMessages={validationMessage}
                id="shareForm"
                onFinish={handleShare}
              >
                <Form.Item
                  label="Email"
                  name={["email"]}
                  rules={[{ type: "email", required: true }]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
