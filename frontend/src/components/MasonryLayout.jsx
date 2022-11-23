import React from "react";
import Masonry from "react-masonry-css";
import { categories } from "../utils/data";
import Pin from "./Pin";

const breakpointsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 1,
  500: 1,
};

function MasonryLayout({ pins, categoryId }) {
  const categoryTitle = categories.find(
    (category) => category.value === categoryId
  );

  return (
    <>
      {categoryTitle ? (
        <h2 className="text-xl font-bold ml-3">{categoryTitle?.label}</h2>
      ) : (
        ""
      )}
      <Masonry
        className="flex animate-slide-fwd "
        breakpointCols={breakpointsObj}
      >
        {pins?.map((pin, i) => (
          <Pin key={pin._id} pin={pin} className="w-max" />
        ))}
      </Masonry>
    </>
  );
}

export default MasonryLayout;
