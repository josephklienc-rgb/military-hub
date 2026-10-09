import { useState } from "react";
interface User {
  name: string;
  email: string;
  password: string;
}
interface LoginProps {
  onLogin: (email: string) => void;
  onSignup: (email: string) => void;
}

function Login({ onLogin, onSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  const savedUsers = localStorage.getItem(
    "militaryHubUsers"
  );

  const users: User[] = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  onLogin(user.email);
};

const handleSignup = (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const newUser: User = {
    name: name,
    email: email,
    password: password,
  };

  const existingUsers = localStorage.getItem(
    "militaryHubUsers"
  );

  const users: User[] = existingUsers
  ? JSON.parse(existingUsers)
  : [];

const emailExists = users.some(
  (user) => user.email.toLowerCase() === email.trim().toLowerCase()
);

if (emailExists) {
  alert("This email is already registered. Please log in instead.");
  return;
}

users.push(newUser);

  localStorage.setItem(
    "militaryHubUsers",
    JSON.stringify(users)
  );

  onSignup(email);

  alert("Account created successfully!");

  setName("");
  setEmail("");
  setPassword("");
  setIsSignup(false);
};

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-icon">
          🪖
        </div>

        <h1>Military Hub</h1>

        <p className="login-subtitle">
          Sign in to your account
        </p>

        <form onSubmit={isSignup ? handleSignup : handleLogin}>

         {isSignup && (
  <div className="login-input-group">
    <label>Full Name</label>

    <input
      type="text"
      placeholder="Enter your full name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />
  </div>
)}
          <div className="login-input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="login-input-group"> <label>Password</label>

<div className="password-input-wrapper"> <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

<button
  type="button"
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? "Hide" : "Show"}
</button>

</div> </div>

          <button
  type="submit"
  className="login-button"
>
  {isSignup ? "Create Account" : "Login"}
</button>
        </form>

        <p className="login-demo">
  Demo login — authentication will be
  connected later.
</p>

<button
  type="button"
  className="signup-link"
  onClick={() => setIsSignup(!isSignup)}
>
  {isSignup
    ? "Already have an account? Login"
    : "Create an Account"}
</button>

      </div>
    </div>
  );
}

export default Login;