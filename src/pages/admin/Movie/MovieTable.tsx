import { Button, message, Modal, Select, Space, Table } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { UpdateMovie } from "../../../redux/slice/Movie";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { formatDate, convertMovieTime, formatDateString, formatCurrency } from "../../../ultils";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { defaultStatus } from "../../../ultils/data";

type Props = {
  data: any
};
const { Option } = Select;

const ListMovie = ({ data }: Props) => {
  document.title = "Admin | DS Phim";
  const dispatch = useAppDispatch();

  const changeStatus = (id: any, value: any) => {
    dispatch(UpdateMovie({ _id: id, status: value })).unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };


  const columnUserList: any = [
    {
      title: "Ảnh",
      dataIndex: "image",
      fixed: "left",
      render: (_: any, { image, _id }: any) => (
        <Link to={_id}>
          <img width="50px" src={image} height="50px" />
        </Link>
      ),
      width: 120,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (_: any, { name, _id }: any) => <Link to={_id}>{name}</Link>,
    },
    {
      title: "Ngày khởi chiếu",
      key: "releaseDate",
      render: (_: any, record: any) => (
        <div>
          <p>{formatDate(record?.releaseDate)}</p>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Doanh thu",
      key: "profit",
      render: (_: any, record: any) => (
        <div>
          <p>{formatCurrency(record?.profit)}</p>
        </div>
      ),
      width: "150px",
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      render: (item: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          <AiOutlineInfoCircle
            onClick={() => info(item._id)}
            style={{
              color: "var(--primary)",
              fontSize: "18px,",
              cursor: "pointer",
            }}
          />
          {record?.status == 0 && (
            <Button type="dashed" block >
              <Link to={`/admin/showTimes/create?movieId=${record?._id}`}>
                <PlusOutlined
                  style={{ color: "var(--primary)", fontSize: "18px" }}
                />
                Tạo suất chiếu
              </Link>
            </Button>
          )}
          <Button type="dashed" block>
            <Link to={`/admin/showTimes?movieId=${record?._id}`}>
              Danh sách giờ chiếu
            </Link>
          </Button>
          <Button type="dashed" block>
            <Link to={`/admin/movieComment/${record?._id}`}>
              Đánh giá về phim
            </Link>
          </Button>
        </Space>
      ),
      width: 250,
    },
  ];

  const dataTable: Props[] = data?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      image: item?.image[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      name: item?.name,
      actor: item?.actor,
      runTime: item?.runTime,
      releaseDate: item?.releaseDate,
      ageLimit: item?.ageLimit,
      languages: item?.languages,
      country: item?.country,
      director: item?.director,
      description: item?.description,
      status: item?.status,
      profit: item?.profit,
    };
  });
  const info = (id: any) => {
    const movieOne = data.find((item: any) => item._id === id);

    Modal.info({
      title: `${movieOne?.name} - ( Doanh thu: ${formatCurrency(movieOne?.profit)})`,
      width: 1000,
      content: (
        <div>
          <div className="grid grid-cols-[30%,70%]">
            <div>
              <img src={movieOne?.image[0]?.url} alt="" width={200} />
            </div>
            <div>
              <p></p>
              <p>
                Loại phim:{" "}
                {movieOne?.movieTypeId?.map(
                  (item: any) => item.movieName + ", "
                )}
              </p>
              <p>Thời lượng: {convertMovieTime(movieOne?.runTime)}</p>
              <p>Diễn viên: {movieOne?.actor}</p>
              <p>Đạo diễn: {movieOne?.director}</p>
              <p>Quốc gia: {movieOne?.country}</p>
              <p>Ngày khởi chiếu: {formatDateString(movieOne?.releaseDate)}</p>
            </div>
          </div>
          <div className="mt-4">{movieOne?.description}</div>
        </div>
      ),
      onOk() { },
    });
  };
  return (
    <div>
      <Table columns={columnUserList} dataSource={dataTable} />
    </div>
  );
};

export default ListMovie;
