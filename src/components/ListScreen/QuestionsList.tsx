import React from "react";
import { Table, Avatar, Tag } from "antd";
import { QuestionType, ChoicesType } from "../../interfaces";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<QuestionType> = [
  {
    title: "Image",
    dataIndex: "thumb_url",
    key: "thumb_url",
    width: 100,
    render: (thumb) => (
      <Avatar
        src={thumb}
        style={{ width: "56px", height: "56px", border: "solid 3px #1890ff" }}
      />
    ),
    className: "cursor-pointer",
  },
  {
    title: "Question",
    dataIndex: "question",
    key: "question",
    width: 350,
    className: "cursor-pointer",
  },
  {
    title: "Published at",
    dataIndex: "published_at",
    key: "published_at",
    render: (date) => (
      <Tag color="blue" style={{ width: 70 }}>
        {new Date(date).toLocaleDateString()}
      </Tag>
    ),
    className: "cursor-pointer",
  },
  {
    title: "Choices",
    dataIndex: "choices",
    key: "choices",
    render: (choices) => (
      <ul>
        {choices.map((ch: ChoicesType) => (
          <li>{ch.choice}</li>
        ))}
      </ul>
    ),
    className: "cursor-pointer",
  },
];

const QuestionList = ({ questions }: { questions: QuestionType[] }) => {
  const navigate = useNavigate();
  return (
    <Table
      columns={columns}
      dataSource={questions}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/questions/${record.key}`);
          },
        };
      }}
    />
  );
};

export default QuestionList;
