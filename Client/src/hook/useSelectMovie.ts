import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { getMovie, selectMovies, selectPending } from '../redux/slice/Movie'
import { getdashBoard } from '../redux/slice/DashBoard';
type DashBoardMovie = {
  name: string,
  data: any[],
  percent?: number,
  top5: []
}

const useSelectMovie = () => {
  const [top5, setTop5] = useState<any>([]);
  const [activeMv, setActiveMv] = useState<any>([]);
  const [inActiveMv, setInActiveMv] = useState<any>([]);
  const [mostProfit, setMostProfit] = useState<any>([]);
  const dispatch = useAppDispatch();
  const labels = top5.map((item: any) => item.name)
  const datasetChart: number[] = top5.map((item: any) => item.profit);
  const [dashboard, setDashboard] = useState([])
  useEffect(() => {
    (async () => {
      await dispatch(getMovie());
    })();

  }, [dispatch]);

  const movies = useAppSelector(selectMovies);
  const isLoading = useAppSelector(selectPending);

  useEffect(() => {
    if (movies) {
      setActiveMv(movies.filter((item) => item.status == 0));
      setInActiveMv(movies.filter((item) => item.status !== 0));
    }
  }, [movies]);
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getdashBoard());
      const topMovieProfit = payload.topMovieProfit;
      const thanZero = topMovieProfit.filter((item: any) => item.profit > 0);
      if (thanZero) {
        let a1 = thanZero.slice(0, 1)
        let a2 = topMovieProfit.slice(0, 5)
        const a = a1.reduce(function (acc: any, cur: any,) { return cur }, {});
        setMostProfit(a);
        setTop5(a2);
        setDashboard(payload)
      }
    })();

  }, [dispatch])

  return { movies, activeMv, inActiveMv, isLoading, mostProfit, top5, labels, datasetChart, dashboard }
}

export default useSelectMovie
