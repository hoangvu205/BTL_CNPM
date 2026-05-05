import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [genre, setGenre] = useState('');

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:3000/movies', {
        params: { search, status, genre }
      });
      if (res.data.success) {
        setMovies(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, status, genre]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Movies</h2>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search movie title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="now_showing">Now Showing</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
        </div>
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Filter by Genre (e.g. Action)" 
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {movies.map(movie => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <div className="card h-100">
              <img src={movie.poster_url || "https://via.placeholder.com/300x400"} className="card-img-top" alt={movie.title} style={{ objectFit: 'cover', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted">{movie.genre}</p>
                <span className={`badge ${movie.status === 'now_showing' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                </span>
                <div className="mt-3">
                  <Link to={`/movies/${movie.id}`} className="btn btn-primary w-100">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
