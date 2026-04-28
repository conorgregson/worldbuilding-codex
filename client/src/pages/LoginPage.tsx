import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/useAuth";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { StatusMessage } from "../components/ui/StatusMessage";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login.mutateAsync({ email, password });
      navigate("/worlds");
    } catch {
      // handled below
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card-wrap">
        <Card>
          <div className="auth-heading">
            <h1>Login</h1>
            <p>Sign in to continue building and managing your fictional worlds.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Email</span>
              <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {login.isError ? (
              <StatusMessage variant="error">
                {login.error instanceof Error ? login.error.message : "Login failed"}
              </StatusMessage>
            ) : null}

            <div className="card-actions">
              <Button type="submit" disabled={login.isPending} className="auth-submit">
                {login.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="auth-footer">
            Need an account? <Link to="/register">Register</Link>
          </p>
        </Card>
      </div>
    </main>
  );
}