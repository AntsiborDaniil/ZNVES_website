import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "underline";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  prefetch?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({
  children,
  variant = "primary",
  className,
  fullWidth,
  ...rest
}: ButtonProps) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, prefetch = false } = rest;
    return (
      <Link href={href} className={classNames} prefetch={prefetch}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classNames} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
