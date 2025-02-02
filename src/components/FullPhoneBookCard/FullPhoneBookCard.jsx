const FullPhoneBookCard = () => {
  return (
    <div className="w-xs bg-base-200 border border-base-300 p-4 rounded-box text-center">
      <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900">
        There are contacts in your book.
      </h5>
      <div className="font-normal text-l text-gray-700">
        <p>Start typing a name or a number</p>
        <p> to find the contact you need.</p>
      </div>
    </div>
  );
};

export default FullPhoneBookCard;
