import { Button, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { EditOutlined } from "@ant-design/icons";
type Props = {};

const ListMovieType = (props: Props) => {
  const { movieType, isFetching } = useAppSelector(
    (state) => state.movieTypeReducer
  );

  const columnList: any = [
    {
      title: "Tên",
      render: (item: any, index: any) => <p>{item.movieName}</p>,
      height: "10",
    },
    {
      title: "Hành động",
      key: "action",
      height: "10",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Link to={`${item._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
        </Space>
      ),
      width: 30,
    },
  ];
  const data = movieType?.map((item: any) => {
    return {
      _id: item._id,
      movieName: item.movieName,
    };
  });
  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieTypeAdd}>
            Thêm thể loại phim
          </Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
        </Button>
      </div>
      <DataTable column={columnList} data={data} loading={isFetching} />
    </>
  );
};

export default ListMovieType;
