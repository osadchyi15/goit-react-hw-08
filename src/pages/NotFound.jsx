const NotFound = () => {
  return (
    <section className="bg-transparent">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-6xl text-primary-600 ">
            Page not found
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page .
          </p>
          <a href="/" className="btn btn-primary">
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
