import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Trang Chủ
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src="/sadasd"
      />
    </div>
  );
}