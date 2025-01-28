type IButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <div className="relative *:rounded-md *:border-2 *:border-black *:text-black">
      <button
        {...props}
        className="relative bg-white block px-5 py-2.5 text-sm font-medium transition hover:-translate-x-1 hover:-translate-y-1 z-10 hover:cursor-pointer"
      >
        {children}
      </button>

      <div className="inset-0 absolute top-0 left-0 z-0 border-dashed" />
    </div>
  );
};

export default Button;
