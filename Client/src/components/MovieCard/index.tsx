import { Modal } from 'antd';
import { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
type Props = {
    item: any
}

const MovieCard = ({ item }: Props) => {
    const [like, setLike] = useState(false);
    const [detail, setDetail] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (id: any) => {
        setIsModalOpen(true);
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN`).then(({ data }) => {
            setDetail(data);
        })
    };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };
    console.log(detail)
    return (
        <div className="w-[250px] h-[350px] pl-2  bg-black inline-block cursor-pointer relative p-2 ">
      
            <img className='w-full h-full block object-contain' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item?.title} />
            <div className="absolute w-full top-0 left-0 h-full hover:bg-black/80  opacity-0 hover:opacity-100 text-white">
                <p onClick={() => showModal(item?.id)} className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <Modal title={
                    <div className="font-extrabold text-2xl  bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-500">
                        {item?.title}
                    </div>}
                    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <i> <b>Description: </b> {detail?.overview || "Chưa có mô tả cho phim này"}</i> <br />
                    <i> <b>Genres: </b>{detail?.genres && detail?.genres?.map((item: any) => <span key={item.id}>{item?.name.concat(" ")}</span>)}</i> <br />
                    <i> <b>Release date: </b> {detail?.release_date}</i> <br />
                    <p className='mt-3 pt-3'>  <Link to={`/${item?.slug}`} state={detail} className='bg-red-600 text-white px-2 py-2 rounded-r-sm hover:text-black font-semibold'>Đặt vé</Link> </p>
                </Modal>
                <p className=''>
                    {like ? <FaHeart className='absolute top-4 left-5 text-gray-300' size={25} /> : <FaRegHeart className='absolute top-4 left-5 text-gray-300'size={25}  />}
                </p>
            </div>
        </div>
    )
}

export default MovieCard