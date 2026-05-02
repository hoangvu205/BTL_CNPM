import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const registerAction = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3000/register",
                form
            );

            console.log(res.data);
            alert("Đăng ký thành công");

        } catch (err) {
            console.log(err);
            alert("Đăng ký thất bại");
        }
    };

    return (
        <div className="row mt-5">
            <div className="col-4"></div>

            <form
                className="col-4 d-flex flex-column gap-3"
                onSubmit={registerAction}
            >
                <h2 className="text-center">
                    Register
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Enter username"
                    className="form-control"
                    value={form.name}
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

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>

            <div className="col-4"></div>
        </div>
    );
}