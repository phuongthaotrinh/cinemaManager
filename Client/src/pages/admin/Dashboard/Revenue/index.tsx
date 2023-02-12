import React, { lazy } from 'react'
import useSelectMovie from './../../../../hook/useSelectMovie';
import { Tabs } from 'antd';
const Days = lazy(() => import('./Days'));

type Props = {}

const Revenue = (props: Props) => {
  const { dashboard } = useSelectMovie();
  console.log(dashboard);
  const items = [
    { label: "Days", key: "1", children: <Days /> },
    { label: "Month", key: "2", children: <Days /> },
    { label: "Year", key: "3", children: <Days /> }
  ]
  return (
    <div className='p-5'>
      <Tabs
        tabPosition={"left"}
        items={items}
      />
    </div>
  )
}

export default Revenue