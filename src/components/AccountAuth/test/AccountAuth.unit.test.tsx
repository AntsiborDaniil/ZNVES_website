import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AccountAuth from "../AccountAuth";

const checkAuth = vi.fn();

vi.mock("../../../contexts/AuthContext", () => ({
  useAuth: () => ({ checkAuth }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("AccountAuth", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    checkAuth.mockReset();
  });

  it("renders login form by default", () => {
    render(<AccountAuth />);

    expect(screen.getByRole("heading", { name: "Вход в личный кабинет" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
  });

  it("switches to registration form", async () => {
    const user = userEvent.setup();
    render(<AccountAuth />);

    await user.click(screen.getByRole("button", { name: "Регистрация" }));

    expect(screen.getByRole("heading", { name: "Регистрация" })).toBeInTheDocument();
    expect(screen.getByLabelText("Имя")).toBeInTheDocument();
    expect(screen.getByLabelText("Фамилия")).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<AccountAuth />);

    const passwordInput = screen.getByLabelText("Пароль");
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Показать пароль" }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Скрыть пароль" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows validation errors for empty login submit", async () => {
    const user = userEvent.setup();
    render(<AccountAuth />);

    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(await screen.findByText("Введите email")).toBeInTheDocument();
    expect(screen.getByText("Введите пароль")).toBeInTheDocument();
  });
});
