import { CardSearch } from "../CardSearch/CardSearch";

export const ItemSearch = ({ products, keyWord, setKeyWord }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main focus:border-main"
            placeholder="Search Any Product here ..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-green-400 duration-300 hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
          <CardSearch products={products} keyWord={keyWord} />
        </div>
      </form>
    </div>
  );
};
