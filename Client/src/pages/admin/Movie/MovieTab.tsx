import { Button, Tabs, message } from 'antd';
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/hook';
import MovieTable from './MovieTable';
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../../redux/slice/OrdersSlice';
import { Link } from 'react-router-dom';
import configRoute from '../../../config';
import SearchByCate from '../../../components/admin/SearchByCate';
import { MovieMutipleOption } from '../../../ultils/data'
type Props = {
}

const MovieTab = ({ }: Props) => {
   document.title = "Admin | Orders";
   const dispatch = useDispatch<any>();
   useEffect(() => { dispatch(getAllOrders({})) }, [dispatch])
   const {movie, isLoading} = useAppSelector((state) => state.movie)
   const [movieActive, setMovieActive] = useState<any[]>([]);
   const [movieInActive, setMovieInActive] = useState<any[]>([]);
   const [hiddenEl, setHiddenEl] = useState<any>(false)
   const [findData, setFindData] = useState<any[]>([]);
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
         children: <MovieTable data={movieActive} isLoading={isLoading} statusUpdate={1} currStatus={0}/>
      },
      {
         key: 2,
         label: `Phim đã dừng hoạt động(${movieInActive?.length}) `,
         children: <MovieTable data={movieInActive} isLoading={isLoading} statusUpdate={0} currStatus={1}/>
      },
   ]
   const SearchItems: any[] = [
      {
         key: 4,
         label: ` Phim tìm thấy (${findData?.length})`,
         children: <MovieTable data={findData} isLoading={isLoading}/>
      },
   ]

   const onFinish = (val: any) => {
      if (val?.optionData == "name") {
         let a = movie.filter((item: any) => item?.name.toLowerCase().includes(val?.searchValue.toLowerCase()));
         if (a?.length > 0) { setHiddenEl(true); setFindData(a) } else { message.error("Không tìm phim đơn nào"); setFindData([]); setHiddenEl(true) }
      }
   }
   const onReset = () => {
      setHiddenEl(false)
   }
   return (
      <>
         <SearchByCate data={movie} onFinish={onFinish} onReset={onReset} category={MovieMutipleOption} />
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
         {!hiddenEl ? (
            <Tabs
               defaultActiveKey="1"
               size={"small"}
               style={{ marginBottom: 32 }}
               items={items}
            />
         ) : (
            <Tabs
               defaultActiveKey="1"
               size={"small"}
               style={{ marginBottom: 32 }}
               items={SearchItems}
            />
         )}
      </>

   )
}

export default MovieTab