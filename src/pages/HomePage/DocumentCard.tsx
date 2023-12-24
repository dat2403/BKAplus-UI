import React from "react";
import { DocumentModel } from "../../network/models/DocumentModel.ts";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import icVerified from "../../assets/icons/is_after_verified.png";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../../shared/utility/useMockData.ts";

interface DocumentCardProps {
  doc: DocumentModel;
}

const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const { doc } = props;
  const navigate = useNavigate();
  const { defaultThumbnail } = useMockData();
  return <div key={doc?.id} className="course-card" onClick={() => {
    navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${doc?.id}`);
  }}>
    <img src={defaultThumbnail} alt="course-img" className="course-image" />
    <div className="course-content">
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <div className="title">{doc?.title}</div>
        {doc?.is_verified === true &&
          <img src={icVerified} alt="" style={{
            width: "20px",
            height: "20px"
          }} />}
      </div>
      <div className="description">{doc?.description}</div>
    </div>
  </div>;
};

export default DocumentCard;
