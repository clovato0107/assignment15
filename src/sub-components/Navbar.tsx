import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* <--- Use the Link component */}
          </li>
          <li>
            <Link to="/about">About</Link> {/* <--- Use the Link component */}
          </li>
          <li>
            <Link to="/contact">Contact</Link>{" "}
            {/* <--- Use the Link component */}
            </li>
            <li>
              <Link to="/playlist">Playlist</Link>{" "}
              {/* <--- Use the Link component */}
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
