const Loading = () => {
  return (
    <div className="loading-container">
      <div
        className="fixed top-0 bg-white h-screen w-full flex justify-center items-center text-3xl text-white"
        style={{
          maxWidth: "430px",
          zIndex: 999
        }}
      >
        <div className="text-center pt-10 animate-pulse">
          <h1 className="text-2xl font-bold text-black">Loading...</h1>
          <h2 className="text-lg font-bold text-purple-700">Akadify</h2>
        </div>
      </div>
    </div>
  );
};

export default Loading;
