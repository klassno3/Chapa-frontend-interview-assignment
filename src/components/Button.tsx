import React from "react";


type ButtonProps = {
  title: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "transparent";
  onClick?: (() => void)
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  loading = false,
  size = "md",
  variant = "primary",
  ...props
}) => {
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    transparent: "bg-transparent text-black border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      type={ type }
      onClick={ onClick }
      className={ `w-full rounded cursor-pointer transition-colors duration-300  font-sans capitalize flex items-center justify-center gap-2  disabled:opacity-60  disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}` }
      disabled={ loading }
      { ...props }
    >
      { loading && (
        <svg
          className="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          />
        </svg>
      ) }
      <span>{ title }</span>
    </button>
  );
};
