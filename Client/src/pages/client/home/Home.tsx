import React, { useEffect, useState ,lazy} from "react";
import { Link } from "react-router-dom";
const SlideShow = lazy(() => import("../../../components/client/SlideShow/SlideShow")) ;
import styles from "./Home.module.scss";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { convertDateToNumber, formatDate } from "../../../ultils";
const  Voucher = lazy(() => import( "../../../components/client/voucher"));
const  News = lazy(() => import("../News/News")) ;
const  Loading = lazy(() => import("../../../components/Loading")) ;
import { getSlider } from "../../../redux/slice/Slider";
import { getMovie } from "../../../redux/slice/Movie";

type Props = {};

const Home = (props: Props) => {
  document.title = "SUNCINEMA";
  const [isAcive, setActive] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [movieActive, setMovieActive] = useState<any>([]);
  const [sliderActive, setSliderActive] = useState<any>([]);
  const { slider, isFetching } = useAppSelector((state) => state.slider);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSlider());
    dispatch(getMovie())
  }, [dispatch])
  const Toggle = (number: number) => {
    setActive(number);
  };
  const { movie } = useAppSelector((state: any) => state.movie);
  useEffect(() => {
    if (movie) {
      let a = movie?.filter((item: any) => item?.status == 0);
      setMovieActive(a);
    }
    if (slider) {
      setSliderActive(slider?.filter((item: any) => item?.status == 0));
    }
  }, [movie, slider]);
  let dateToday = Date.now();
  //  convert date to number
  let data = movieActive.map((item: any) => {
    return (item = {
      ...item,
      releaseDate: convertDateToNumber(item.releaseDate),
    });
  });
  const data1 = data
    .sort((a: any, b: any) => a.releaseDate - b.releaseDate)
    .filter((item: any) => item.releaseDate <= dateToday);
  const data2 = data
    .sort((a: any, b: any) => a.releaseDate - b.releaseDate)
    .filter((item: any) => item.releaseDate > dateToday);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : <SlideShow slider={sliderActive} />}
      <div className={styles.content}>
        <div className={styles.content_btn}>
          <button
            onClick={() => Toggle(1)}
            className={isAcive == 1 ? styles.content_btn_active : ""}
          >
            Phim ??ang chi???u
          </button>
          <button
            onClick={() => Toggle(2)}
            className={isAcive == 2 ? styles.content_btn_active : ""}
          >
            Phim s???p chi???u
          </button>
        </div>
        {/* Home Page 1 */}
        <div className={isAcive == 1 ? styles.content_btn1 : "hidden"}>
          <div className={styles.content_list}>
            {data1?.map((item: any) => (
              <div className={styles.content_list_item} key={item._id}>
                <Link to={item.slug}>
                  <div className={styles.content_list_item_img}>
                    <img
                      src={
                        item?.image[0]?.url ??
                        `${import.meta.env.VITE_HIDDEN_SRC}`
                      }
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div className={styles.content_list_item_info}>
                    <h3>{item.name}</h3>
                    <p>
                      Th??? lo???i:{" "}
                      {item.movieTypeId?.map((x: any) => x.movieName + ", ")}
                    </p>
                    <p>Kh???i chi???u: {formatDate(item.releaseDate)}</p>
                    <button>?????t v??</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* End Home Page 1 */}

        {/* Home page 2 */}
        <div className={isAcive == 2 ? styles.content_btn2 : "hidden"}>
          <div className={styles.content_list}>
            {data2?.map((item: any) => (
              <div className={styles.content_list_item} key={item._id}>
                <Link to={item.slug}>
                  <div className={styles.content_list_item_img}>
                    <img
                      src={
                        item?.image[0]?.url ??
                        `${import.meta.env.VITE_HIDDEN_SRC}`
                      }

                      alt=""
                    />
                  </div>
                  <div className={styles.content_list_item_info}>
                    <h3>{item.name}</h3>
                    <p>
                      Th??? lo???i:{" "}
                      {item.movieTypeId?.map((x: any) => x.movieName + ", ")}
                    </p>
                    <p>Kh???i chi???u: {formatDate(item.releaseDate)}</p>
                    <button>?????t v??</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* End Home Page 2 */}

        <Link to={`#`}>
          <div className={styles.more}>
            <p>Xem th??m</p>
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </div>
        </Link>

        <div className={styles.content_news_cmt}>
          <div className={styles.content_news}>
            <h3>Tin t???c</h3>
            <News activeNav={true} isShow={isShow} />
          </div>
        </div>

        <div className={styles.content_news_cmt}>
          <div className={styles.content_news}>
            <h3>Khuy???n m??i m???i</h3>
            <Voucher activeNav={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
