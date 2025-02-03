const Loader = () => {
  return (
    <div className="flex gap-4 justify-center">
      <span className="loading loading-spinner text-success"></span>
      <span className="loading loading-spinner text-warning"></span>
      <span className="loading loading-spinner text-error"></span>
    </div>
  );
};

export default Loader;
