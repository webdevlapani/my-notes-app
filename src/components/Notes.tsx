import { Row, Col, Card, Space, Button, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { NoteType } from "../App";

interface NotesProps {
  notes: NoteType[];
  setEditId: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<any>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Notes: React.FC<NotesProps> = ({
  notes,
  setEditId,
  setNotes,
  searchTerm,
  setSearchTerm,
}) => {
  const [sort, setSort] = useState({
    order: "asc",
    field: "created_at",
  });
  const onEditClickHandler = (id: string) => {
    setEditId(id);
  };

  const onDeleteClickHandler = (id: string) => {
    setNotes(notes.filter((item: any) => item.id !== id));
  };

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filterData = notes.map((item: any) =>
      !item.title.includes(e.target.value)
        ? item
        : {
            ...item,
            isFilter: true,
          }
    );

    setNotes(filterData);
  };

  const handleFieldChange = (value: string) => {
    setSort((prev) => ({
      ...prev,
      field: value,
    }));
  };
  const handleSortByOrder = (value: string) => {
    setSort((prev) => ({
      ...prev,
      order: value,
    }));
  };
  return (
    <>
      <Space
        style={{
          margin: "auto",
          maxWidth: "700px",
          display: "block",
        }}
      >
        <Row gutter={10}>
          <Col md={14} span={24}>
            <Input.Search
              className="search-bar"
              placeholder="Search Todos"
              value={searchTerm}
              onChange={onSearchHandler}
            />
          </Col>
          <Col md={6} span={12}>
            <Select
              defaultValue="created_at"
              style={{ width: "100%" }}
              onChange={handleFieldChange}
              options={[
                { value: "title", label: "Title" },
                { value: "created_at", label: "Created at" },
                { value: "modify_at", label: "Modify at" },
              ]}
            />
          </Col>
          <Col md={4} span={12}>
            <Select
              defaultValue="asc"
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              onChange={handleSortByOrder}
              options={[
                { value: "asc", label: "asc" },
                { value: "desc", label: "desc" },
              ]}
            />
          </Col>
        </Row>
      </Space>

      <Row gutter={16}>
        {notes
          ?.filter((item: NoteType) =>
            !!searchTerm
              ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              : true
          )
          .sort((a: any, b: any) => {
            if (sort.order === "asc" && sort.field === "title") {
              return a[sort.field].localeCompare(b[sort.field]);
            }
            if (sort.order === "desc" && sort.field === "title") {
              return b[sort.field].localeCompare(a[sort.field]);
            }
            if (sort.order === "asc") {
              return new Date(a[sort.field]).getTime() >
                new Date(b[sort.field]).getTime()
                ? 1
                : -1;
            } else if (sort.order === "desc") {
              return new Date(a[sort.field]).getTime() <
                new Date(b[sort.field]).getTime()
                ? 1
                : -1;
            }
          })

          ?.map((note: any) => (
            <Col>
              <Card
                title={note?.title}
                className="main-card"
                extra={
                  <Space>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => onEditClickHandler(note.id)}
                    />
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteClickHandler(note.id)}
                    />
                  </Space>
                }
                bordered={false}
                style={{ width: 300 }}
              >
                <p>Desc : {note?.description}</p>
                <p>Created At : {note?.created_at}</p>
                <p>Modified At : {note?.modified_at}</p>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Notes;
