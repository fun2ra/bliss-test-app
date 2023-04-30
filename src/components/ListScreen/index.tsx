import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import TryAgain from "../TryAgain";
import BlissMockApiService from "../../services/BlissMockApiService";
import QuestionsList from "./QuestionsList";
import { mockInitialQuestion as initialQuestion } from "../../mockData";
import { Button, Tooltip, Form, Input } from "antd";
import { RightOutlined, LoadingOutlined } from "@ant-design/icons";
import { FilterFormType } from "../../interfaces";

const ListScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  const [questionList, setQuestionList] = useState([initialQuestion]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);

  const checkServer = (): Promise<void> =>
    BlissMockApiService.checkServerHealth().then((response) => {
      setIsServerError(!response);
      setIsLoading(false);
    });

  useEffect(() => {
    checkServer();
  }, []);

  useEffect(() => {
    if (filter != "") setFilterLoading(true);

    BlissMockApiService.getQuestions(limit, offset, filter).then((response) => {
      if (questionList[0] === initialQuestion || filter != "") {
        // The case of filter it's render the same object getted, not correct backend behavior
        // The app will not see any change
        setQuestionList(response);
      } else {
        // Here I'm mocking the response because the server it's always returning the same answer
        // in order to see a variation on the table
        const offsetQuestionList = [...questionList, ...response];
        setQuestionList(offsetQuestionList);
      }
      setFilterLoading(false)
    });
  }, [limit, offset, filter]);

  const handleFilterSubmit = (e: FilterFormType) => {
    setFilter(e.filter);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingScreen text="Checking server health..." />
      ) : (
        <div>
          {isServerError ? (
            <TryAgain tryAgain={checkServer} />
          ) : (
            <div>
              <div className="filter-form">
                <div>
                  <Form layout="inline" onFinish={handleFilterSubmit}>
                    <Form.Item label="Filter" name={["filter"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={filterLoading && <LoadingOutlined />}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <Tooltip title="Fetch next questions">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={() => setOffset((offset) => offset + 1)}
                  ></Button>
                </Tooltip>
              </div>
              <QuestionsList questions={questionList} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListScreen;
