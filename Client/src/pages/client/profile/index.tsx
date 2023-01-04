import { useEffect, useState } from "react";
import { Tabs } from "antd";
import UserInfo from "./UserInfo";
import { useAppSelector } from "../../../redux/hook";
import UserOrder from "./UserOrder";
import ChangePassword from "./ChangePassword";
type Props = {};

const Profile = (props: Props) => {
  const [yourOrder, setYourOrder] = useState<any>([])
  const { currentUser, accessToken } = useAppSelector((state) => state.authReducer);
  const { orders } = useAppSelector((state) => state.OrderReducer)
  useEffect(() => {
    setYourOrder((orders?.filter((item: any) => item?.userId?._id == currentUser?._id)))
  }, [orders, currentUser])

  const items: any[] = [
    {
      label: "Thông tin người dùng",
      key: 1,
      children: <UserInfo data={currentUser} token={accessToken} />
    },
    {
      label: "Đổi mật khẩu",
      key: 2,
      children: <ChangePassword />
    },
    {
      label: "Danh sách đơn hàng",
      key: 3,
      children: <UserOrder orders={yourOrder} />
    }
  ]
  return (
        <div className="container mt-[30px] min-h-[550px] h-[550px] bg-slate-50 p-5">
          <Tabs
            className="p-3"
            tabPosition="left"
            items={items}
          />
        </div>

  );
};

export default Profile;
