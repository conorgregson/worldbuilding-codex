import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

export default function NotFoundPage() {
  return (
    <main className="page-shell">
      <Card>
        <div className="section-heading">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or may have moved.</p>
        </div>

        <div className="card-actions">
          <Link to="/worlds">Go to Worlds</Link>
        </div>
      </Card>
    </main>
  );
}