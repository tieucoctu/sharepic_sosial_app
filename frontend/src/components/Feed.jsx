import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Loading from "./Loading";
import MasonryLayout from "./MasonryLayout";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        console.log("data :", data);
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (loading) return <Loading />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
