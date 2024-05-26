import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-4">
      <div className="container-fluid">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i>&nbsp;{user.name}
        </span>
        <button className="btn btn-outline-danger" onClick={startLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Salir</span>
        </button>
      </div>
    </nav>
  );
};
