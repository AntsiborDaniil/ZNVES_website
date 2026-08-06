import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CookieBanner from "../CookieBanner";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockPathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const STORAGE_KEY = "znves:cookie_consent";

describe("CookieBanner", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    localStorage.clear();
    mockPathname.mockReturnValue("/");
  });

  it("shows banner when consent is missing", async () => {
    render(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Мы используем cookie" })
      ).toBeInTheDocument();
    });
  });

  it("hides banner after accept and stores consent", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Принять" })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Принять" }));

    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    expect(
      screen.queryByRole("dialog", { name: "Мы используем cookie" })
    ).not.toBeInTheDocument();
  });

  it("does not show banner when consent already given", async () => {
    localStorage.setItem(STORAGE_KEY, "1");
    render(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Мы используем cookie" })
      ).not.toBeInTheDocument();
    });
  });

  it("keeps banner visible after route change when consent is missing", async () => {
    const { rerender } = render(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Мы используем cookie" })
      ).toBeInTheDocument();
    });

    mockPathname.mockReturnValue("/catalog");
    rerender(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Мы используем cookie" })
      ).toBeInTheDocument();
    });
  });
});
