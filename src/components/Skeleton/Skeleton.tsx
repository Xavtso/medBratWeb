import "./Skeleton.scss";
import { BsChatSquareDots } from "react-icons/bs";

const Skeleton = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <BsChatSquareDots size={48} />
      </div>
      <h2 className="empty-title">No Chat Selected</h2>
      <p className="empty-subtitle">
        Select a conversation from the sidebar or start a new one to begin
        chatting.
      </p>
    </div>
  );
};

export default Skeleton;
