import React, { useEffect } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, removeSuccess } from "../features/user/userSlice";
import { removeError } from "../features/products/productSlice";

const Register = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(
    "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
  );
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      toast.error("Please fill all the fields", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    console.log(myForm.entries());
    for (let pair of myForm.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("User Registered Successfully", {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [success, error, dispatch]);

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-content">
          <form
            className="form"
            onSubmit={registerSubmit}
            encType="multipart/form-data"
          >
            <h2>Sign Up</h2>

            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={user.name}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group avatar-group">
              <label htmlFor="avatar">Avatar:</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="file-input"
                accept="image/"
                onChange={registerDataChange}
              />
              <img src={avatarPreview} alt=" User Avatar" className="avatar" />
            </div>

            <button className="authBtn">Sign Up</button>
            <p className="form-links">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
