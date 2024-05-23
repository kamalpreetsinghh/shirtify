const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    </div>
  );
};

export default Loader;
