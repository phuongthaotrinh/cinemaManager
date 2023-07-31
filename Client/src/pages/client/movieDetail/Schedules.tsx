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

    return (
        <>
          Schedules




        </>
    )
}

export default Schedules