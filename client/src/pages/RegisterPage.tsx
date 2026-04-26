import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../features/auth/useAuth";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { StatusMessage } from "../components/ui/StatusMessage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await register.mutateAsync({ email, password });
      navigate("/login");
    } catch {
      // handled below
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card-wrap">
        <Card>
          <div className="auth-heading">
            <h1>Register</h1>
            <p>Create an account to start organizing worlds, entities, relationships, and events.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {register.isError ? (
              <StatusMessage variant="error">
                {register.error instanceof Error
                  ? register.error.message
                  : "Registration failed"}
              </StatusMessage>
            ) : null}

            <div className="card-actions">
              <Button
                type="submit"
                disabled={register.isPending}
                className="auth-submit"
              >
                {register.isPending ? "Creating account..." : "Register"}
              </Button>
            </div>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}