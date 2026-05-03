import { useState } from "react";
import axios from "axios";
import { Navigate ,useNavigate} from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const loginAction = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3000/login",
                form
            );
            if(res.data.check){
                console.log(res.data);
                localStorage.setItem(
                    "token",
                    res.data.token
                );
                navigate("/");
                location.reload();
                
            }
            else{
                alert("sai tai khoan hoac mat khau")
            }
            
        } catch (err) {
            console.log(err);
            alert("Sai tài khoản hoặc mật khẩu");
        }
    };
    return (
        <div className="row mt-5">
            <div className="col-4"></div>
            <form className="col-4 d-flex flex-column gap-3" onSubmit={loginAction} >
                <h2 className="text-center">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div className="col-4"></div>
        </div>
    );
}