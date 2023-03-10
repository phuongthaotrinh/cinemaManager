import { Button, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useState, useEffect,lazy } from "react";
import {
  discountPercent,
  formatCurrency,
  formatDate,
  formatDateString,
  formatTime,
  upperOrLowerText
} from "../../../ultils";
import { isFuture, isPast, parseISO } from "date-fns";
import { banks } from "../../../ultils/data";
import { validateMessages } from "../../../ultils/FormMessage";
import { createPaymeny } from "../../../redux/slice/OrdersSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { updateData } from "../../../redux/slice/voucherSlice";
import Swal from "sweetalert2";
const PaymentStep = lazy(() => import("../../../components/client/PaymentStep")) ;
const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

type Props = {
};
const Payment = ({ }: Props) => {

  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const { currentUser } = useAppSelector((state: any) => state.authReducer);
  const [tempPrice, setTempPrice] = useState<any>();
  const [voucherMess, setVoucherMess] = useState<any>("");
  const [voucherMess2, setVoucherMess2] = useState<any>("");
  const { vouchers } = useAppSelector((state: any) => state.voucherReducer);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>();
  const [CODE, setCODE] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [info, setInfo] = useState<any>();
  const [voucherActive, setVoucherActive] = useState<any>([]);
  const [voucherApply, setVoucherApply] = useState<any>();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { movie } = useAppSelector((state: any) => state.movie);
  const navigate = useNavigate()
  const { state } = useLocation();

  let movieSelect = movie?.find(
    (item: any) => item?._id === state?.populatedDetail[0]?.showTimeId?.movieId
  );
  useEffect(() => {
    let active = vouchers?.filter((item: any) => item?.status == 0)
    setVoucherActive(active)
  }, [vouchers])

  useEffect(() => {
    if (state && movieSelect) {
      setInfo(state?.populatedDetail);
      setData(state?.ticket);
      setTempPrice(state?.finalPrice);
      setPriceAfterDiscount(state?.finalPrice);
    }
    document.title = "Payment";
  }, [state, movieSelect]);

  useEffect(() => {
    form.setFieldsValue({
      username: currentUser?.fullname ?? currentUser?.username,
      email: currentUser?.email,
      phone: currentUser?.phone,
      paymentType: "",
      voucherCode: "",
    });
  }, []);

  const checkCode = (codeVal: any, e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    setVoucherApply(null);
    if (codeVal.length >= 1) {
      setCODE(codeVal);
    } else {
      setCODE("");
      setVoucherMess("");
      setPriceAfterDiscount(tempPrice);
    }
  };

  const handle = () => {
    if (CODE) {
      let upperCode = upperOrLowerText(CODE, "upper");
      let item = voucherActive.find((item: any) => item?.code === upperCode);
      let checkUsed = item?.userId?.find(
        (val: any) => val?._id === currentUser?._id
      );
      if (item === undefined) {
        setVoucherMess("Kh??ng t??m th???y m?? voucher");
      } else if (isPast(parseISO(item?.timeEnd))) {
        setVoucherMess("Voucher ???? h???t h???n s??? d???ng");
      } else if (isFuture(parseISO(item?.timeStart))) {
        setVoucherMess(
          `Voucher ??p d???ng t??? ng??y ${formatDate(item?.timeStart)}`
        );
      } else {
        setVoucherApply(item)
        let vcDiscount = item?.conditionNumber;
        let vcValue = item?.voucherVal; // ti???n t???i thi???u ????? gi???m
        if (tempPrice < vcValue) {
          setVoucherMess2("H??a ????n ch??a ????? ??i???u ki???n ????? gi???m");
        } else if (checkUsed) {
          setVoucherMess2("b???n ???? s??? d???ng voucher n??y");
        } else {
          let limit = item?.voucherLimit;
          if (item?.condition === 1) {
            setPriceAfterDiscount(Number(tempPrice) - Number(vcDiscount));
            let price2: any = Number(tempPrice) - Number(vcDiscount);
            if (price2 <= limit) {
              setPriceAfterDiscount(price2);
            } else {
              setPriceAfterDiscount(Number(tempPrice) - Number(limit));
            }
          } else if (item?.condition === 0) {
            let price: any = discountPercent(tempPrice, vcDiscount);
            if (price <= limit) {
              setPriceAfterDiscount(Number(tempPrice) - Number(price));
            } else {
              setPriceAfterDiscount(Number(tempPrice) - Number(limit));
            }
          }
          message.info("???? ??p d???ng m?? gi???m gi??");
        }

        setVoucherMess("");
      }
    } else {
      setVoucherMess("");
      setPriceAfterDiscount(tempPrice);
    }
  };

  const onFinish = (val: any) => {
    let payload = {
      userId: currentUser?._id,
      ticketId: data?._id,
      totalPrice: priceAfterDiscount,
      bankCode: val.paymentType,
      orderDescription: "thanh toan",
      orderType: "billpayment",
      language: "",
      foodDetailId: state?.foodDetailId,
      voucherId: voucherApply
    };

    Swal.fire({
      title: "B???n c?? ch???c mu???n thanh to??n",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(createPaymeny(payload)).unwrap()
          .then((res: any) => {
            if (voucherApply) {
              let voucherChange = {
                _id: voucherApply?._id,
                quantity: voucherApply?.quantity - 1,
                userId: [...voucherApply?.userId, currentUser?._id]
              }
              dispatch(updateData(voucherChange)).unwrap()
                .then(() => { window.location.href = `${res}` })
                .catch((err: any) => message.error(err.message))
            }
            else {
              window.location.href = `${res}`
            }
          })
          .catch((err: any) => message.error(`${err}`));
      }
    });
  };
  const backStep = () => {
    navigate("/combo", { state: state })
  }
  const ButtonBack = () => {
    return (
      <Button
        onClick={backStep}
        style={{
          width: "47%",
          marginLeft: "17px",
          backgroundColor: "#f6710d",
          border: "none",
        }}
        type="primary"
        htmlType="submit"
        className="hover: text-red-600"
      >
        Quay l???i
      </Button>
    )
  }
  const childrenComp = () => {
    return (
      <div className="bg-[#ffffff] h-[550px] max-h-[550px]  w-[98%] max-w-[98%] p-5 ml-2">
        <Form
          {...layout}
          layout="horizontal"
          className="w-[67%] mx-auto pt-5"
          form={form}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="paymentType"
            label="H??nh th???c thanh to??n"
            rules={[{ required: true }]}
          >
            <Select placeholder="Ch???n ng??n h??ng" allowClear>
              {banks?.map((item, index: any) => (
                <Select.Option key={index} value={item?.value}>
                  <div className="flex justify-between">
                    {item?.name}
                    <img src={item?.image} alt="" width="25px" height="25px" />
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="username"
            label="H??? v?? t??n"
            rules={[{ required: true, min: 5, whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="S??? ??i???n tho???i"
            rules={[{ required: true, whitespace: true, len: 10 }]}
          >
            <Input />
          </Form.Item>

          <div className="">
            <Form.Item name="voucherCode" label="M?? gi???m gi??">
              <Input onChange={(e: any) => checkCode(e?.target?.value, e)} />
            </Form.Item>
            <small className="text-red-500 ml-[270px]">
              {voucherMess} {voucherMess2}
            </small>
          </div>
          <div className=" w-[260px] justify-center flex flex-col ml-[250px] float-right">
            <Button
              onClick={handle}
              style={{
                width: "100%",
                backgroundColor: "#f6710d",
                border: "none",
              }}
              type="primary"
              htmlType="button"
            >
              ??p d???ng
            </Button>
            <p className="text-xs mt-2 ">
              (*) B???ng vi???c click/ch???m v??o THANH TO??N, b???n ???? x??c nh???n hi???u r??
              c??c Quy ?????nh Giao D???ch Tr???c Tuy???n c???a {webConfigs[0]?.storeName}.
            </p>

            <div className="flex">
              <ButtonBack />
              <Button
                style={{
                  width: "47%",
                  marginLeft: "17px",
                  backgroundColor: "#f6710d",
                  border: "none",
                }}
                type="primary"
                htmlType="submit"
                className="hover: text-red-600"
              >
                Thanh to??n
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  };
  const rightContent = () => {
    return (
      <>
        <div className="w-[80%] mx-auto p-2">
          <img src={movieSelect?.image[0]?.url} alt="" className=" h-[140px]" />
        </div>
        <h1 className="font-bold uppercase px-4 pt-2">{movieSelect?.name}</h1>
        {info && (
          <>
            <ul className="px-4 py-3">
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>R???p</b>: {webConfigs[0]?.storeName} |
                {info && <>{info[0]?.seatId?.roomId?.name}</>}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Su???t chi???u</b>:
                {info && formatTime(info[0]?.showTimeId?.startAt)} |
                {formatDateString(info[0]?.showTimeId?.date)}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Combo</b>:
                {state?.foodDetail?.map((item: any) => (
                  <span key={item?.foodId?._id}>
                    {item?.foodId?.name}({item?.quantity})
                  </span>
                ))}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Gh???</b>:
                {info &&
                  info?.map((item: any) => (
                    <span key={item?._id}>
                      {item?.seatId?.row}
                      {item?.seatId?.column},
                    </span>
                  ))}
              </li>
            </ul>
          </>
        )}
        <h2 className="px-4 text-base">
          T???ng Gi??:
          <span className="font-semibold text-xl text-[#dcdcd]">
            {formatCurrency(tempPrice)}
          </span>
        </h2>

        <h2 className="px-4 text-base">
          T???ng:
          {priceAfterDiscount ? (
            <>
              <span className="font-semibold text-xl text-[#f6710d]">
                {formatCurrency(priceAfterDiscount)}
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold text-xl text-[#f6710d]">
                {formatCurrency(tempPrice)}
              </span>
            </>
          )}
        </h2>
      </>
    );
  };

  return (
    <PaymentStep
      ticket={state?.ticket}
      children={childrenComp()}
      nextStep={null}
      rightContent={rightContent()}
      name="Thanh to??n"
      send={state}
    />
  );
};

export default Payment;
