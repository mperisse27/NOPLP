import React, { useEffect, useState } from "react";
import type { Category } from "../types/gameTypes";
import ApiService from "../services/apiService";

const Game = () => {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchData = async () => {
      const apiService = ApiService;
      //const data = await apiService.getCategories();
      const data: Category[] = [
        {
          name: "Category 1",
          songs: [
            {
              id: "1",
              title: "Song 1",
            },
            {
              id: "2",
              title: "Song 2"
            }
          ],
          points: 10
        },
        {
          name: "Category 2",
          songs: [
            {
              id: "3",
              title: "Song 3"
            },
            {
              id: "4",
              title: "Song 4"
            }
          ],
          points: 20
        }
      ];
      setCategories(data);
    };
    fetchData();
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name}>
          <h2>{category.name}</h2>
          <ul>
            {category.songs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
          <p>Points: {category.points}</p>
        </div>
      ))}
    </div>
  );
};

export default Game;
