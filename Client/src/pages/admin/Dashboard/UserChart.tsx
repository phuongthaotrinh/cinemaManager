import { Table } from "antd";
import useSelectUser from "../../../hook/useSelectUser";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props { }

const UserChart = (props: Props) => {
  const { dayta } = useSelectUser();
  const data = {
    labels: dayta.map((item) => item.name),
    datasets: [
      {
        label: "%",
        data: dayta.map((item) => item.percent),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "#",
      key: "key"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div className=" grid grid-cols-2 gap-5	">
      <div className="progress w-full h-auto overflow-auto" style={{
      }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div className="canvas_fill">
        <Doughnut data={data} width={3} height={3} />
      </div>
    </div>
  );
};

export default UserChart;
