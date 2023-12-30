import React from "react";
import { DocumentModel } from "../../network/models/DocumentModel.ts";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import { Chip } from "primereact/chip";
import { useMockData } from "../../shared/utility/useMockData.ts";
import { useUtils } from "../../shared/utility/Util.ts";
import { useNavigate } from "react-router-dom";

interface IRecentProps {
  doc: DocumentModel;
}

const RecentDocumentCard: React.FC<IRecentProps> = (props) => {
  const { doc } = props;
  const { defaultThumbnail } = useMockData();
  const { getPercentageOfLikes } = useUtils();
  const navigate = useNavigate();
  const totalLike = doc?.userReactDocuments?.filter(react => react?.vote === true)?.length
  const totalDislike = doc?.userReactDocuments?.filter(react => react?.vote === false)?.length

  const getLikePercent = () => {
    if(doc?.userReactDocuments?.length !== 0) {
      return totalLike ?? 0;
    } else return "0"
  }

  return <div
    key={doc?.id}
    className="doc-card"
    onClick={() => {
      navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${doc?.id}`);
    }}
  >
    <img
      className="thumbnail"
      src={defaultThumbnail}
      alt="last-seen-img"
    />
    <div className="doc-text-content">
      <div className="doc-title">{doc?.title}</div>
      <div className={"tags-container"}>
        {doc?.categories
          ?.slice(0, 2)
          .map((cate: any) => <Chip key={cate?.id} label={cate?.name} />)}
      </div>
    </div>
    <div className={`like-container ${doc?.userReactDocuments?.length === 0 ? "no-react" : ""}`}>
      <Chip
        icon={"pi pi-thumbs-up-fill"}
        label={`${getPercentageOfLikes(totalLike ?? 0, totalDislike ?? 0).toString() ?? 0}% (${getLikePercent()})`}
      />
    </div>
  </div>;
};

export default RecentDocumentCard;
