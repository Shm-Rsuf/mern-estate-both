import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Listing = () => {
  const listingId = useParams().listingId;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(listing);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchListing = async () => {
        const response = await fetch(`/api/listing/get/${listingId}`);
        const data = await response.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (error) {
      setError(true);
      setLoading(false);
      32;
    }
  }, [listingId]);
  return (
    <main>
      {loading && !error && <p className="text-center mt-5">loading..</p>}
      {!loading && error && (
        <p className="text-red-700 text-center mt-5 text-2xl">
          something went wrong
        </p>
      )}

      {!loading && !error && listing && (
        <>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[55vh]"
                  style={{
                    background: `url(${url}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
