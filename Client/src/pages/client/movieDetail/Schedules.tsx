import { DatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGroupBy } from '../../../hook';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAlSt } from '../../../redux/slice/ShowTimeSlice';
import { formatDate2 } from '../../../ultils';
type Props = {
  slug: any
}

const Schedules = ({ slug }: Props) => {
  const dispatch = useAppDispatch();
  const [stByMovie, setSByMovie] = useState<any>();
  const { groupByDate2, groupByTime2 } = useGroupBy();
  const [today, setToday] = useState<any>(formatDate2(Date.now()));
  const [dataToday, setDataToday] = useState<any>([]);
  const [userSel, setUserSel] = useState<any>();
  const [dataTimeCv, setDataTimeCv] = useState<any>();
  const todayWithoutFormat = Date.now()

  useEffect(() => {
    dispatch(getAlSt({}));
  }, [slug, dispatch]);

  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const sortAllStByDate = groupByDate2(stByMovie);

  useEffect(() => {
    if (stList) {
      setSByMovie(stList?.filter((item) => item?.movieId?.slug === slug && formatDate2(item?.date) >= today));
    }
  }, [slug, stList]);

  useEffect(() => {
   if(!userSel) {
    (async() => {
      const dtNow = await findShowTimeByDate(todayWithoutFormat);
      setDataToday(dtNow);
    })();
   }
    
  }, [slug, todayWithoutFormat]);


  const findShowTimeByDate = (value: any) => {
    const dataByValue = [] as any
    for (const iterator in sortAllStByDate) {
      sortAllStByDate[iterator].map((item: any) => {
        if (formatDate2(item?.date) == formatDate2(value)) {
          dataByValue.push(item)
        }
      });
    }
    console.log("dataByValue", dataByValue)
    return dataByValue
  }

  const RenderST = () => {
    const timer = [];
    for (const dataKey in dataTimeCv) {
      let row = dataTimeCv[dataKey]?.map((item: any, index: any) => (
        <div key={`${index}.${item._id}`}>
          {item?._id}
        </div>
      ));
      timer.push(row)
    }

    // }
    return <div className='h-[200px] w-[120px] bg-white text-black mt-10'>{timer}</div>

  }


  // return (
  //   <div className='p-4'>
  //     {/* {RenderData()} */}
  //     <DatePicker format={"DD/MM/YYYY"} defaultValue={moment(Date.now())} onChange={(e) => setUserSel(e)} /> <br />
  //     {/* {dataToday.length > 0 ? 'cos data' : 'k co saya'} */}
  //     {RenderST()}
  //   </div>


  return (
    <>
      <DatePicker format={"DD/MM/YYYY"} defaultValue={moment(Date.now())} onChange={(e) => setUserSel(e)} /> <br />
      {RenderST()}
    </>
  )

}

export default Schedules