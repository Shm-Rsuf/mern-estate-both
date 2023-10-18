const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="left p-5 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-4" />
              <span>Sale & Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="p-2 rounded-md focus: outline-none border-2 border-slate-400 cursor-pointer"
            >
              <option value="">Price low to high</option>
              <option value="">Price hogh to low</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-slate-600 duration-300 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed">
            search
          </button>
        </form>
      </div>
      <div className="right px-4">
        <h2 className="text-3xl font-semibold text-slate-700 border-b mt-5 p-2">
          Listing results
        </h2>
      </div>
    </div>
  );
};

export default Search;
