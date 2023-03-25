import { Link, useLocation } from "react-router-dom";
import "./list.css";

export default function List() {
  const location = useLocation();
  const list = location.list;
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title || "Tên list"}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list?._id || "id"}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list?.genrer || "loại"}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list?.type || "kiểu"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề</label>
            <input type="text" placeholder={list?.title || ""} />
            <label>Kiểu</label>
            <input type="text" placeholder={list?.type || ""} />
            <label>Thể loại</label>
            <input type="text" placeholder={list?.genrer || ""} />
          </div>
          <div className="productFormRight">
            <button className="productButton">Cập nhập List</button>
          </div>
        </form>
      </div>
    </div>
  );
}