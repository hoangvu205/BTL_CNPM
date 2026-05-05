import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', duration: '', release_date: '', genre: '', poster_url: '', status: 'now_showing'
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:3000/movies');
      if (res.data.success) setMovies(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/movies/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3000/movies', formData);
      }
      setFormData({ title: '', description: '', duration: '', release_date: '', genre: '', poster_url: '', status: 'now_showing' });
      setEditingId(null);
      fetchMovies();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title, description: movie.description, duration: movie.duration,
      release_date: movie.release_date.split('T')[0], genre: movie.genre,
      poster_url: movie.poster_url, status: movie.status
    });
    setEditingId(movie.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this movie?")) {
      try {
        await axios.delete(`http://localhost:3000/movies/${id}`);
        fetchMovies();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Movies</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-light p-4 rounded">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="genre" className="form-control" placeholder="Genre" value={formData.genre} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input type="number" name="duration" className="form-control" placeholder="Duration (mins)" value={formData.duration} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <input type="date" name="release_date" className="form-control" value={formData.release_date} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
              <option value="now_showing">Now Showing</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>
          <div className="col-md-12 mb-3">
            <input type="text" name="poster_url" className="form-control" placeholder="Poster URL" value={formData.poster_url} onChange={handleChange} />
          </div>
          <div className="col-md-12 mb-3">
            <textarea name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">{editingId ? 'Update' : 'Add'} Movie</button>
            {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={() => {setEditingId(null); setFormData({ title: '', description: '', duration: '', release_date: '', genre: '', poster_url: '', status: 'now_showing' })}}>Cancel</button>}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th><th>Genre</th><th>Duration</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td><td>{movie.genre}</td><td>{movie.duration}m</td><td>{movie.status}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(movie)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovies;
