import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { useState } from 'react';
import { useEffect } from 'react';
import { getAlSt } from './../redux/slice/ShowTimeSlice';
import { formatDate2 } from './../ultils/index';
import { useGroupBy } from '../hook';



export const useGetSchdules = () => {
  const dispatch = useAppDispatch()
  const { slug } = useParams();
  const [stByMovie, setSByMovie] = useState<any>();
  const { groupByDate2 } = useGroupBy();
  const [today, setToday] = useState<any>(formatDate2(Date.now()));

  useEffect(() => {
    dispatch(getAlSt({}));
  }, [slug, dispatch])
  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const sortAllStByDate = groupByDate2(stByMovie);

  useEffect(() => {
    if (stList) {
      const a = (stList?.filter((item) => item?.movieId?.slug === slug && formatDate2(item?.date) >= today));
      setSByMovie(a);
    }
  }, [slug, stList]);



  return { today , sortAllStByDate}

}

