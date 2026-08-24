import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
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
  onClick?: MouseEventHandler<HTMLAnchorElement>;
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
    const { href, prefetch = false, onClick } = rest;
    return (
      <Link href={href} className={classNames} prefetch={prefetch} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  // className / type после spread — иначе HTML-атрибуты могут перетереть собранные классы
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
