import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  console.log("offer", offerListings);
  console.log("rent", rentListings);
  console.log("sale", saleListings);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* TOP */}
      <div className="flex flex-col gap-6 py-24 px-4 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-semibold text-3xl lg:text-6xl">
          Fine your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-slate-400 text-xs sm:text-sm">
          usuf state is the best place to fine your next perfect place to live
          <br />
          we have wide range of properties for you to choose from.
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-600 font-semibold hover:underline duration-300 cursor-pointer group"
        >
          Let&apos;s get started
        </Link>
      </div>
      {/* SWIPER */}
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[60vh] w-full"
                style={{
                  background: `url(${listing.imageUrls[0]}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* RENT, SALE,OFFER */}
      <div className="max-w-6xl mx-auto flex flex-col my-10 gap-8">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline cursor-pointer duration-300"
                to="/search?offer=true"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline cursor-pointer duration-300"
                to="/search?type=rent"
              >
                Show more place for Rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline cursor-pointer duration-300"
                to="/search?type=sale"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
