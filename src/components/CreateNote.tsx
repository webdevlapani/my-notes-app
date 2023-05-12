import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { NoteType } from "../App";

interface CreateNoteProps {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<any>>;
  editId: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setEditId: React.Dispatch<React.SetStateAction<string>>;
}

const CreateNote: React.FC<CreateNoteProps> = ({
  notes,
  setNotes,
  editId,
  setSearchTerm,
  setEditId,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editId) {
      const newValue = notes.find((item: NoteType) => item.id === editId);
      form.setFieldsValue({
        title: newValue?.title,
        description: newValue?.description,
      });
    }
  }, [editId]);

  const onFinishHandler = (data: any) => {
    const final = notes?.map((item: NoteType) =>
      item.id === editId
        ? {
            ...item,
            title: data.title,
            description: data.description,
            modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          }
        : { ...item }
    );
    editId
      ? setNotes(final)
      : setNotes([
          ...notes,
          {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            modified_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ]);
    form.resetFields();
    setSearchTerm("");
    setEditId("");
  };

  return (
    <>
      <Typography style={{ justifyContent: "center", display: "flex" }}>
        <Typography.Title level={1}>My Notes</Typography.Title>
      </Typography>
      <Form
        form={form}
        style={{ margin: "auto", maxWidth: "700px" }}
        onFinish={onFinishHandler}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your todo title!" }]}
        >
          <Input className="search-bar" placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your todo description!",
            },
          ]}
        >
          <Input.TextArea className="search-bar" placeholder="Description" />
        </Form.Item>

        <Form.Item>
          <Button className="form-item-mr" type="primary" htmlType="submit">
            {editId ? "Update Todo" : "Add Todo"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateNote;
