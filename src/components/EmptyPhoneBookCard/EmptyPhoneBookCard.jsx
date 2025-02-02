const EmptyPhoneBookCard = () => {
  return (
    <div className="w-xs bg-base-200 border border-base-300 p-4 rounded-box text-center">
      <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900">
        Your phonebook is empty.
      </h5>
      <p className="font-normal text-l text-gray-700">
        Please add your first contact to the phonebook!
      </p>
    </div>
  );
};

export default EmptyPhoneBookCard;
