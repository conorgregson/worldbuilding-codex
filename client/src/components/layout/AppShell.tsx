import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogout } from "../../features/auth/useAuth";
import { Button } from "../ui/Button";

export function AppShell() {
  const navigate = useNavigate();
  const logout = useLogout();

  async function handleLogout() {
    await logout.mutateAsync();
    navigate("/login");
  }

  return (
    <div
      className="screenshot-clean"
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <header className="app-header">
        <div className="app-header__inner">
          <Link
            to="/worlds"
            className="app-brand"
            style={{ textDecoration: "none" }}
          >
            <span className="app-brand__dot" />
            <span>Worldbuilding Codex</span>
          </Link>

          <Button
            type="button"
            variant="secondary"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </header>

      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  );
}