import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    useEffect(() => {
        if (!token || !email) {
            setMessage("Invalid reset link");
        }
    }, [token, email]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetPasswordAction = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        if (form.newPassword.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/reset-password",
                {
                    email,
                    token,
                    newPassword: form.newPassword
                }
            );

            if (res.data.check) {
                setMessage("Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(res.data.message || "Error resetting password");
            }
        } catch (err) {
            console.log(err);
            setMessage("Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row mt-5">
            <div className="col-4"></div>
            <form
                className="col-4 d-flex flex-column gap-3"
                onSubmit={resetPasswordAction}
            >
                <h2 className="text-center">
                    Reset Password
                </h2>

                {message && (
                    <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
                        {message}
                    </div>
                )}

                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    className="form-control"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    className="form-control"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !token || !email}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>
            </form>
            <div className="col-4"></div>
        </div>
    );
}