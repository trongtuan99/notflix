import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import { useLocation, Link} from 'react-router-dom'

export default function Watch() {
  const location = useLocation()
  console.log(location);
  const movie = location.movie;
  return (
    <div className="watch">
      <div className="back">
      <Link to='/' className="link" style={{display: 'flex', alignItems: 'center'}}>
          <ArrowBackOutlined style={{marginRight: '4px'}}/>
          Trang Chủ
      </Link>
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie && movie.video}
      />
    </div>
  );
}