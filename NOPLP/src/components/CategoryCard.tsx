import type { Category } from "../types/gameTypes";

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onClick: () => void;
}

const CategoryCard = ({ category, selected, onClick }: CategoryCardProps) => {
  return (
    <div className={`flex space-x-1 ${selected ? '' : 'cursor-pointer'} w-full`} onClick={selected ? undefined : onClick}>
      <div key={category.name} className={`${selected ? 'bg-[#202076] text-gray-200' : 'bg-blue-700 text-white'} p-4 rounded-lg shadow-md, border-2 border-white w-full`}>
        <h2>{category.name}</h2>
      </div>
      <div className={`${selected ? 'bg-[#202076] text-gray-200' : 'bg-blue-700 text-white'} p-4 rounded-lg shadow-md border-2 border-white`}>
        {category.points}
      </div>
    </div>
  );
};

export default CategoryCard;
