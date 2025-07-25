import { FaRegStar, FaStar } from 'react-icons/fa6';

export default function StarRating({ rating }: { rating: number }) {
  const fullStar = Math.floor(rating);
  const emptyStar = 5 - fullStar;

  return (
    <div className="flex">
      {[...Array(fullStar)].map((_, idx) => {
        return <FaStar key={idx} style={{ color: '#FFD700' }} />;
      })}
      {[...Array(emptyStar)].map((_, idx) => {
        return <FaRegStar key={idx} style={{ color: '#FFD700' }} />;
      })}
    </div>
  );
}
