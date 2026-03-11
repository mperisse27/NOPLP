import type { Category } from "../types/gameTypes";

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onClick: () => void;
}

const CategoryCard = ({ category, selected, onClick }: CategoryCardProps) => {
  return (
    <div className="flex space-x-1 cursor-pointer" onClick={onClick}>
      <div key={category.name} className="bg-blue-700 p-4 rounded-lg shadow-md, border-2 border-white w-[80%]">
        <h2>{category.name}</h2>
        {
          selected &&
          <ul>
            {category.songs.map((song, idx) => (
              <li key={idx}>{song.title}</li>
            ))}
          </ul>
        }
      </div>
      <div className="bg-blue-700 p-4 rounded-lg shadow-md, border-2 border-white 2-[20%]">
        {category.points}
      </div>
    </div>
  );
};

export default CategoryCard;
