import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ movie_id: '', room_id: '', start_time: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    try {
      const [stRes, mRes, rRes] = await Promise.all([
        axios.get('http://localhost:3000/showtimes'),
        axios.get('http://localhost:3000/movies'),
        axios.get('http://localhost:3000/cinema-rooms')
      ]);
      if (stRes.data.success) setShowtimes(stRes.data.data);
      if (mRes.data.success) setMovies(mRes.data.data);
      if (rRes.data.success) setRooms(rRes.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/showtimes/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3000/showtimes', formData);
      }
      setFormData({ movie_id: '', room_id: '', start_time: '', price: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Error saving showtime');
    }
  };

  const handleEdit = (st) => {
    const formattedDate = new Date(st.start_time).toISOString().slice(0, 16);
    setFormData({ movie_id: st.movie.id, room_id: st.room.id, start_time: formattedDate, price: st.price });
    setEditingId(st.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this showtime?")) {
      try {
        await axios.delete(`http://localhost:3000/showtimes/${id}`);
        fetchData();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Showtimes</h2>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="mb-4 bg-light p-4 rounded">
        <div className="row">
          <div className="col-md-3 mb-3">
            <select name="movie_id" className="form-select" value={formData.movie_id} onChange={handleChange} required>
              <option value="">Select Movie</option>
              {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <select name="room_id" className="form-select" value={formData.room_id} onChange={handleChange} required>
              <option value="">Select Room</option>
              {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <input type="datetime-local" name="start_time" className="form-control" value={formData.start_time} onChange={handleChange} required />
          </div>
          <div className="col-md-2 mb-3">
            <input type="number" name="price" className="form-control" placeholder="Price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="col-md-1 mb-3">
            <button type="submit" className="btn btn-success w-100">{editingId ? 'Upd' : 'Add'}</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead>
          <tr><th>Movie</th><th>Room</th><th>Start Time</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {showtimes.map(st => (
            <tr key={st.id}>
              <td>{st.movie.title}</td><td>{st.room.name}</td><td>{new Date(st.start_time).toLocaleString()}</td><td>{st.price} VNĐ</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(st)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(st.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminShowtimes;
