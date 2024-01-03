import React from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useAppSelector } from "../../store/Store.ts";
import { useUtils } from "../../shared/utility/Util.ts";
import "./DocDetailsPage.scss";

interface IProps {
  comment: any;
}

const SeeMoreComment: React.FC<IProps> = ({ comment }) => {
  const { user } = useAppSelector(state => state.auth);
  const { formatUtcDateString } = useUtils();
  const [showFullComment, setShowFullComment] = React.useState(false);

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");

    if (showFullComment || words.length <= maxWords) {
      return text;
    }

    return words.slice(0, maxWords).join(" ") + "...";
  };


  return <div className={"comment-item"}>
    <div className={"user-info"}>
      <Avatar
        label="V"
        size="large"
        style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
        shape="circle"
        image={comment?.author?.avatar}
      />
      <div>{comment?.author?.full_name}</div>
    </div>
    <Button
      style={{ marginLeft: "10px" }}
      icon="pi pi-thumbs-up-fill"
      rounded
      severity="success"
      aria-label="Like"
    />
    <div className="created-time">Đăng tải ngày {formatUtcDateString(comment?.createdAt as string)}</div>
    <div className="content">
      {truncateText(comment?.content, 10)}
      <>
        {comment?.content.split(" ").length > 10 && (
          <button
            style={{
              all: "unset",
              color: "#06b6d4",
              textDecoration: "underline",
              marginLeft: "10px",
            }}
            onClick={toggleComment}>
            {showFullComment ? "thu gọn" : "xem thêm"}
          </button>
        )}
      </>
    </div>

    <div className={"button-group"}>
      <Button label="Like" />
      <Button label="Report" severity="secondary" />
    </div>
  </div>;
};

export default SeeMoreComment;
