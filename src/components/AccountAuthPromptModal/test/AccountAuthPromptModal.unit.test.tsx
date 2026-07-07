/* eslint-disable @next/next/no-img-element */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import AccountAuthPromptModal from "../AccountAuthPromptModal";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt?: string }) => <img alt={alt ?? ""} />,
}));

describe("AccountAuthPromptModal", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "unset";
  });

  it("renders auth prompt content", () => {
    render(<AccountAuthPromptModal onClose={vi.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Войдите в личный кабинет")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Перейти ко входу" })).toHaveAttribute(
      "href",
      "/account"
    );
  });

  it("calls onClose when skip is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<AccountAuthPromptModal onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Продолжить без входа" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on escape key", async () => {
    const onClose = vi.fn();
    render(<AccountAuthPromptModal onClose={onClose} />);

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
