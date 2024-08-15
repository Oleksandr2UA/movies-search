import '../Loader/Loader.css';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = ({ isNight, height, width }) => {
  return (
    <ThreeDots
      visible={true}
      height={height ? height : '80'}
      width={width ? width : '80'}
      color={isNight ? '#fff' : '#000'}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
    />
  );
};
