import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        const movieRes = await axios.get(`http://localhost:3000/movies/${id}`);
        if (movieRes.data.success) {
          setMovie(movieRes.data.data);
        }

        const showtimesRes = await axios.get(`http://localhost:3000/showtimes`);
        if (showtimesRes.data.success) {
          // Filter showtimes for this specific movie
          const movieShowtimes = showtimesRes.data.data.filter(st => st.movie.id === parseInt(id));
          setShowtimes(movieShowtimes);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieAndShowtimes();
  }, [id]);

  if (!movie) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster_url || "https://via.placeholder.com/400x600"} alt={movie.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="text-muted">{movie.genre} | {movie.duration} mins | Release: {new Date(movie.release_date).toLocaleDateString()}</p>
          <span className={`badge mb-3 ${movie.status === 'now_showing' ? 'bg-success' : 'bg-warning text-dark'}`}>
            {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
          </span>
          <h4>Description</h4>
          <p>{movie.description}</p>

          <hr />
          <h4>Available Showtimes</h4>
          {showtimes.length === 0 ? (
            <p>No showtimes available for this movie right now.</p>
          ) : (
            <div className="list-group">
              {showtimes.map(st => (
                <div key={st.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{st.room.name}</strong> - {new Date(st.start_time).toLocaleString()}
                  </div>
                  <span className="badge bg-primary rounded-pill">{st.price} VNĐ</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
