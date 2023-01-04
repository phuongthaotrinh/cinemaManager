import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/hook';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../redux/slice/userSlice';
import AdminUserList from './List';
type Props = {
}

const UserTab = ({ }: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useDispatch<any>();
   useEffect(() => { dispatch(getUsers()) }, [dispatch])
   const { users } = useAppSelector((state: any) => state.userReducer);
   const [userActive, setUserActive] = useState<any[]>([]);
   const [userInActive, setUserInActive] = useState<any[]>([]);
   const [userClose, setUserClose] = useState<any[]>([]);
   useEffect(() => {
      if (users) {
         setUserInActive(users?.filter((item: any) => item?.status == 0));
         setUserActive(users?.filter((item: any) => item?.status == 1))
         setUserClose(users?.filter((item: any) => item?.status == 2))
      }
   }, [users])

   const items: any[] = [
      {
         key: 1,
         label: `Người dùng đang hoạt động (${userActive?.length})`,
         children: <AdminUserList data={userActive} />
      },
      {
         key: 2,
         label: `Người dùng  đã dừng hoạt động(${userClose?.length}) `,
         children: <AdminUserList data={userClose} />
      },
      {
         key: 3,
         label: `Người dùng chưa xác thực(${userInActive?.length}) `,
         children: <AdminUserList data={userInActive} />
      },
   ]

   return (
      <>
         <div className="flex gap-5">
            <Button type="primary" style={{ marginBottom: "20px" }}>
               <Link to="/admin/users/add">Tạo người dùng</Link>
            </Button>
         </div>
         <Tabs
            defaultActiveKey="1"
            size={"small"}
            style={{ marginBottom: 32 }}
            items={items}
         />

      </>

   )
}

export default UserTab