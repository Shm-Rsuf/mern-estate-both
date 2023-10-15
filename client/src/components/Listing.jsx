import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Listing = ({ listing }) => {
  return (
    <div className="border border-gray-300 p-2 rounded-md flex justify-between items-center gap-4">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="w-20 h-20 object-contain"
        />
      </Link>

      <Link
        to={`/listing/${listing._id}`}
        className="text-slate-700 flex-1 font-semibold truncate"
      >
        <p>{listing.name} </p>
      </Link>

      <div className="flex flex-col items-center p-2">
        <button className="text-red-700 font-semibold">Delete</button>
        <button className="text-green-700 font-semibold">Edit</button>
      </div>
    </div>
  );
};

Listing.propTypes = {
  listing: PropTypes.object,
};

export default Listing;
