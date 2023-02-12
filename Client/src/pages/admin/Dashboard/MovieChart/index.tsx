import React, { useState, lazy } from "react";
import { formatCurrency } from "./../../../../ultils/index";
import Slider from "react-slick";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useSelectMovie } from "../../../../hook";
const Chart = lazy(() => import("./Chart"))
type Props = {

};

const MovieChart = ({ }: Props) => {
  const [key, setKey] = useState("0");
  const { top5, mostProfit } = useSelectMovie();
  const style = {
    border: "1px solid #dcdcdc",
    borderRadius: "5px",
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"
  };
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    dot: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const items: MenuProps['items'] = [
    { label: "Arnh", key: '0' },
    { label: "chart", key: '1' },
  ];

  return (
    <div className="grid grid-cols-[300px_minmax(700px,_1fr)_100px] gap-3  mt-5	movieDB_container w-full min-w-full max-w-full">
      <div className="item-1" style={style}>
        <div className="text-center p-3">
          <h1 className="font-bold text-lg">Phim được xem nhiều nhất</h1>
        </div>
        <div className=" h-[70%] max-h-[70%] w-[80%] m-auto  shadow-lg rounded-lg item1-content">
          <img
            src={mostProfit?.image?.[0]?.url}
            alt={mostProfit.name}
            className="w-full h-full p-1 object-cover object-center
            "
          />
          <div className="text-center mt-2 item1-content__text ">
            <p>{mostProfit.name}</p>
            <p>{formatCurrency(mostProfit.profit)}</p>
          </div>
        </div>
      </div>

      <div className="item2 " style={style}>
        <div className=" p-3 flex justify-between items-center">
          <div className="">
            <h1 className="font-bold text-lg">Phim được xem nhiều nhất</h1>
          </div>
          <Dropdown menu={{ items, onClick: (e: any) => setKey(e.key), }} >
            <Button onClick={(e: any) => { e.preventDefault() }}>
              <Space>
                Xem theo
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>

          {key == "0" ? (
            <Slider {...settings}>
              {top5.map((item: any, index: any) => (
                <div className="" key={index}>
                  <img src={item?.image?.[0]?.url} alt={item.name} className="img_slider_ad"
                    style={{ objectFit: "fill", minHeight: "350px", maxHeight: "350px", paddingLeft: "5px" }} />
                </div>
              ))}
            </Slider>
          ) : (
            <Chart />
          )}

        </div>

      </div>
      {!top5 && <Spin />}
    </div>
  );
};

export default MovieChart;
