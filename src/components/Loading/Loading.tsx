import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p className="loading-text">Loading your experience...</p>
    </div>
  );
};

export default Loading;
