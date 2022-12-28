import React, { useEffect, useState } from 'react'
import { Button, Empty, Table, TableColumnsType } from 'antd';
import { convertDate, formatDate, formatTime } from '../../../ultils';
import { isPast, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
type Props = {
  data: any
}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
const ListShowTimeByRoom = ({ data }: Props) => {
  const [showByDate, setShowByDate] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      handleSubmit()
    }
  }, []);

  const handleSubmit = () => {
    let sort: any[] = data?.sort((a: any, b: any) => convertDate(a.startAt) - convertDate(b.startAt))
    const groupByDate = sort?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = formatDate(arrayItem.date)
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});
    setShowByDate({ ...groupByDate });
  };
  console.log(showByDate);
  const expandedRowRender = (row: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: '', dataIndex: 'key', key: 'key', width: 0, className: "", render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
      { title: 'Thời gian chiếu ', dataIndex: 'startAt', key: 'startAt', width: 150, render: (_: any, { startAt, endAt }: any) => <p>Từ {startAt} đến {endAt}</p>, },
      { title: 'Tên Phim', dataIndex: 'movieList', key: 'movieList', width: 100, render: (_: any, { movieList }: any) => <p>{movieList?.name}</p> },

      { title: 'Trạng thái truy cập', dataIndex: 'status2', key: 'status2', width: 100, render: (_: any, { status2 }: any) => <p>{status2 ? "Quá hạn, không thể truy cập" : "Đang hoạt động"}</p> },

    ];

    const data: any[] = [];
    for (let showKey in showByDate) {
      showByDate[showKey]?.map((item: any, index: any) => {
        if (formatDate(item?.date) == row?.date) {
          let checkTime = isPast(parseISO(item?.date))
          data.push({
            key: index,
            startAt: formatTime(item?.startAt),
            endAt: formatTime(item?.endAt),
            _id: item?._id,
            status: item?.status,
            movieList: item?.movieId,
            status2: checkTime
          })
        }

      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns: TableColumnsType<any[]> = [
    { title: 'Ngày chiếu', dataIndex: 'date', key: 'date' },
    { title: '', dataIndex: 'key', key: 'key', width: 3, render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
  ];
  const dataTable: any[] = [];
  for (let key in showByDate) {
    dataTable.push({
      key: Math.floor(Math.random() * showByDate[key].length * 100),
      date: key,
    });
  }

  return (
    <>
      {data?.length > 0 ? (
        <div className='container'>
          <Table
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={dataTable}
          />
        </div>
      ) : (
        <div className='h-[300px] container'>
          <Empty description="Chưa có suất chiếu nào" />
        </div>
      )}
    </>
  )
}

export default ListShowTimeByRoom