import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FaMapMarkerAlt } from "react-icons/fa";
const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden transition-shadow hover:shadow-lg duration-300 w-full sm:w-[280px] rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing image"
          className="h-72 sm:h-52 w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-3 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-700 h-4 w-4" />
            <p className="text-sm text-gray-600">{listing.address}</p>
          </div>
          <p className="text-sm text-slate-600 line-clamp-3">
            {listing.description}
          </p>
          <p>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("us-UN")
              : listing.regularPrice.toLocaleString("us-UN")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 text-slate-700 text-sm font-semibold">
            <div>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>

            <div>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object,
};

export default ListingItem;
