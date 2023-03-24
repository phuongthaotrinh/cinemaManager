import { useState, useEffect } from 'react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import MovieCard from '../MovieCard';
import { useAppDispatch } from '../../redux/hook';
import { getOneMovie } from '../../redux/slice/Movie';
interface Props {
    title: string,
    fetchURL: any,
    rowID: string | number,
    rateSpin?: boolean
}

const Row = ({ title, fetchURL, rowID, rateSpin }: Props) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchURL()).then(({ payload }: any) => {
            setData(payload)
        },)


    }, [fetchURL]);
    const slideLeft = () => {
        const slider = (document.getElementById('slider' + rowID)) as HTMLElement;
        slider.scrollLeft = slider.scrollLeft - 400;
    };
    const slideRight = () => {
        const slider = (document.getElementById('slider' + rowID)) as HTMLElement;
        slider.scrollLeft = slider.scrollLeft + 400;
    };
    return (
        <div className='mt-5'>
            <h2 className='text-white font-bold md:text-xl p-4 bg-black uppercase'>{title}</h2>
            <div className="relative flex items-center group ">
                <MdChevronLeft
                    onClick={slideLeft}
                    size={40}
                    className='bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  hidden group-hover:block'
                />

                <div id={'slider' + rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    {data.map((item, index) => (
                        <MovieCard key={index} item={item}/>
                    ))}
                </div>
                <MdChevronRight
                    onClick={slideRight}
                    size={40}
                    className='bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                />
            </div>
        </div>
    )
}

export default Row
