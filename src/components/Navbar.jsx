import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="container px-10 md:px-0 mx-auto flex justify-between">
        <Link href="/" className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white mx-4">NextMongo</h1>
        </Link>
        <ul className="flex gap-x-4">
          <li className="flex items-center justify-center">
            <Link href="/tasks/new" className="border rounded-lg text-green-300 m-2 p-3">New</Link>
          </li>
          <li className="flex items-center justify-center">
            <Link href="/users/logIn" className="border rounded-lg text-green-300 m-2 p-3">Log In</Link>
          </li>
          <li className="flex items-center justify-center">
            <Link href="/users/signUp" className="border rounded-lg bg-green-900 m-2 p-3">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
