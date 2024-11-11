export const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    localStorage.setItem("user", JSON.stringify({ name, email }));

    console.log("Kullanıcı Bilgileri:", { name, email, password });

    loginUser(email, password);
  };
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input
          id="name-input"
          name="name"
          className="register-input"
          type="text"
          placeholder="Name"
        />
        <label htmlFor="email-input">Email</label>
        <input
          id="email-input"
          name="email"
          className="register-input"
          type="text"
          placeholder="email@gmail.com"
        />
        <label>Password</label>
        <input
          id="password-input"
          name="password"
          className="register-input"
          type="password"
          placeholder="Password"
        />
        <button className="button-register">Sign In</button>
      </form>
    </div>
  );
};

const loginUser = (email, password) => {
  console.log("giris yapiliyor", { email, password });
};
