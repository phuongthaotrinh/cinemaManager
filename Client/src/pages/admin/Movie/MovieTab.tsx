import { Button, Tabs } from 'antd';
import { useEffect, useState, lazy } from 'react'
const MovieTable = lazy(() => import('./MovieTable'));
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../../redux/slice/OrdersSlice';
import { Link } from 'react-router-dom';
import configRoute from '../../../config';
import useSelectMovie from "../../../hook/useSelectMovie"
type Props = {
}

const MovieTab = ({ }: Props) => {
   document.title = "Admin | Orders";

   const { activeMv, inActiveMv, isLoading } = useSelectMovie();
   console.log(activeMv, inActiveMv)
   const items: any[] = [
      {
         key: 1,
         label: `Phim đang chiếu (${activeMv?.length})`,
         children: <MovieTable data={activeMv} isLoading={isLoading} statusUpdate={1} currStatus={0} />
      },
      {
         key: 2,
         label: `Phim đã dừng hoạt động(${inActiveMv?.length}) `,
         children: <MovieTable data={inActiveMv} isLoading={isLoading} statusUpdate={0} currStatus={1} />
      },
   ]
   return (
      <>
         <div className="flex gap-5">
            <Button type="primary" style={{ marginBottom: "20px" }}>
               <Link to="/admin/movies/create">Tạo Phim</Link>
            </Button>
            <Button>
               <Link to={configRoute.routes.adminMovieType}>
                  Quản lí thể loại phim
               </Link>
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

export default MovieTab