import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: '', total_seats: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cinema-rooms');
      if (res.data.success) setRooms(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/cinema-rooms/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:3000/cinema-rooms', formData);
      }
      setFormData({ name: '', total_seats: '' });
      setEditingId(null);
      fetchRooms();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (room) => {
    setFormData({ name: room.name, total_seats: room.total_seats });
    setEditingId(room.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this room?")) {
      try {
        await axios.delete(`http://localhost:3000/cinema-rooms/${id}`);
        fetchRooms();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Cinema Rooms</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-light p-4 rounded d-flex gap-3 align-items-center">
        <input type="text" name="name" className="form-control" placeholder="Room Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="total_seats" className="form-control" placeholder="Total Seats" value={formData.total_seats} onChange={handleChange} required />
        <button type="submit" className="btn btn-success">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" className="btn btn-secondary" onClick={() => {setEditingId(null); setFormData({name: '', total_seats: ''})}}>Cancel</button>}
      </form>

      <table className="table table-bordered table-hover">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Total Seats</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td><td>{room.name}</td><td>{room.total_seats}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(room)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRooms;
