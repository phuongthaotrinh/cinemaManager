import { Button, Tabs } from 'antd';
import { useEffect, useState,lazy } from 'react'
import { useAppSelector } from '../../../redux/hook';
const MovieTable = lazy(() => import('./MovieTable')) ;
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../../redux/slice/OrdersSlice';
import { Link } from 'react-router-dom';
import configRoute from '../../../config';
import { getMovie } from '../../../redux/slice/Movie';
import useSelectMovie from "../../../hook/useSelectMovie"
type Props = {
}

const MovieTab = ({ }: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useDispatch<any>();
   useEffect(() => { dispatch(getAllOrders({})) }, [dispatch]);
   useEffect(() => { dispatch(getMovie()) }, [dispatch]);

   const {isLoading} = useSelectMovie({})

   const { movie } = useAppSelector((state) => state.movie)
   const [movieActive, setMovieActive] = useState<any[]>([]);
   const [movieInActive, setMovieInActive] = useState<any[]>([]);
   useEffect(() => {
      if (movie) {
         setMovieActive(movie?.filter((item: any) => item?.status == 0));
         setMovieInActive(movie?.filter((item: any) => item?.status !== 0))
      }
   }, [movie])

   const items: any[] = [
      {
         key: 1,
         label: `Phim đang chiếu (${movieActive?.length})`,
         children: <MovieTable data={movieActive} isLoading={isLoading} statusUpdate={1} currStatus={0} />
      },
      {
         key: 2,
         label: `Phim đã dừng hoạt động(${movieInActive?.length}) `,
         children: <MovieTable data={movieInActive} isLoading={isLoading} statusUpdate={0} currStatus={1} />
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