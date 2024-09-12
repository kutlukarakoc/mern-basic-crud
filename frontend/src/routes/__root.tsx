import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="container mx-auto py-4 flex gap-4">
        <h3 className="text-lg font-bold">MERN CRUD</h3>
        <Link to="/">Home</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
