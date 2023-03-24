import { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Space, message, InputRef } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createMovie } from "../../../redux/slice/Movie";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import MovieForm from "../../../components/admin/Form&Table/MovieForm";
import axios from "axios";
import { getMovieType } from "../../../redux/slice/movieTypeSlice";
import { MovieCountry } from "../../../ultils/data";
type Props = {};

const CreateMovie = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const [form] = Form.useForm();
  document.title = "Admin | Tạo Phim"
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    values.releaseDate = new Date(moment(values.releaseDate).format());
    values.image = values.avatarList?.fileList || image;
    delete values?.avatarList;

    const { meta, payload } = await dispatch(createMovie(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminMovie);
    } else {
      message.error(`${payload}`);
    }
  };

  const onReset = () => {
    form.resetFields();
    setImage([]);
  }
  const [searchText, setSearchText] = useState('');
  const [tmdbData, setTmdbData] = useState<any>({});

  const handleMovieFromID = () => {
    const url = `https://api.themoviedb.org/3/movie/${searchText}?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN&append_to_response=videos`;
    const urlCastnCrew = `https://api.themoviedb.org/3/movie/${searchText}/credits?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN&append_to_response=videos`;

    Promise.all([axios.get(url), axios.get(urlCastnCrew)])
    .then((data: any) => {
      const res = data.map((item: any) => item.data);
      setTmdbData(res);
    })
    .catch(() => {
      message.error("Không tìm thấy film nào");
    })
  }

  useEffect(() => { dispatch(getMovieType()) }, [dispatch]);
  const { movieType } = useAppSelector((state: any) => state.movieTypeReducer);


  useEffect(() => {
    if (tmdbData) {
      const dataImage = [] as any[];
      dataImage.push(
        { url: `https://image.tmdb.org/t/p/original${tmdbData[0]?.backdrop_path}` },
        { url: `https://image.tmdb.org/t/p/w500${tmdbData[0]?.poster_path}` }
      )
      setImage(dataImage);
      const mvTID = tmdbData[0]?.genres.map((item: any) => item?.id);
      const res = [] as any[]; 
      for (const iterator of movieType) {
        for (const check of mvTID) {
            if(iterator?.imdbId == check){
              res.push(iterator);
            }
        }
      }

      let country = {} as any ;
      for (const iterator of MovieCountry) {
        const original_language = tmdbData[0]?.original_language;
        if(iterator?.original_language == original_language){
          country = iterator
        }
      }

      form.setFieldsValue({
        dataImage,
        releaseDate: moment(tmdbData[0]?.release_date),
        runTime: Number(tmdbData[0]?.runtime),
        name: tmdbData[0]?.title,
        status: tmdbData[0]?.status === "Released" ? 0 : 1,
        actor: tmdbData[1]?.cast.map((item: any) => item?.name),
        director: tmdbData[1]?.crew?.map((item: any) => item?.name),
        trailerUrl: ` https://www.youtube.com/watch?v=${tmdbData[0]?.videos?.results?.[0]?.key}`,
        description: tmdbData[0]?.overview || "Nội dung đang cập nhật....",
        movieTypeId: res?.map((item: any) => item?._id),
        country: country?.name
      });
    }
    return () =>{}
  }, [tmdbData]);
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/movies">DS phim</Link>
      </Button>
      <div className="my-3">
        <Space.Compact style={{ width: '90%' }}>
          <label htmlFor="">Lấy thông tin phim từ TMDB</label>
          <Input placeholder="Nhập ID" onChange={(e) => setSearchText(e.target.value)} onPressEnter={handleMovieFromID} />
          <Button type="primary" htmlType="submit" onClick={handleMovieFromID} >Submit</Button>
        </Space.Compact>
      </div>
      <MovieForm image={image} setImage={setImage} form={form} onFinish={onFinish} onReset={onReset} />
    </>
  );
};

export default CreateMovie;
