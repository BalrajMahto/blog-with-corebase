interface ButtonProps {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border border-blue-300 text-blue-500 hover:text-blue-700 hover:border-blue-500 px-4 py-2 rounded-md transition-colors duration-300"
    >
      {title}
    </button>
  );
}

export default Button;
