import style from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={style.preloaderContainer}>
      <div className={style.preloader}></div>
    </div>
  );
};

export default Preloader;
