/* eslint-disable react/prop-types */
const POSTER_BASE_URL = import.meta.env.VITE_TMDB_POSTER_BASE_URL;

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{vote_average ? Math.max(vote_average).toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <div className="lang">{original_language}</div>

          <span>•</span>
          <div className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
