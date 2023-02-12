import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/hook'
import { getdashBoard } from '../redux/slice/DashBoard';



const useSelectMovie = () => {
  const [byDay, setByDay] = useState<any>([]);
  const [byMonth, setByMonth] = useState<any>([]);
  const [byYear, setByYear] = useState<any>([]);
  const [byProfit, setByProfit] = useState<any>([]);
  const [byCompany, setByCompany] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [dashboard, setDashboard] = useState([])

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getdashBoard());
      setByDay(payload.dayProfit);
      setByMonth(payload.monthProfit)
      setByYear(payload.profitByYear);
      setByDay(payload.dayProfit);
      setByProfit(payload.byProfit)
    })();

  }, [dispatch])

  return {  dashboard }
}

export default useSelectMovie