type LogoutButtonProps = {
  onClick: () => void;
};

export default function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
      >
        Logout
      </button>
    </li>
  );
}
