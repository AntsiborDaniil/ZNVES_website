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

const STORAGE_KEY = "znves:cookie_consent";

describe("CookieBanner", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("shows banner when consent is missing", async () => {
    render(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: "Уведомление об использовании cookie" })
      ).toBeInTheDocument();
    });
  });

  it("hides banner after accept and stores consent", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Понятно" })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Понятно" }));

    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    expect(
      screen.queryByRole("region", { name: "Уведомление об использовании cookie" })
    ).not.toBeInTheDocument();
  });

  it("does not show banner when consent already given", async () => {
    localStorage.setItem(STORAGE_KEY, "1");
    render(<CookieBanner />);

    await waitFor(() => {
      expect(
        screen.queryByRole("region", { name: "Уведомление об использовании cookie" })
      ).not.toBeInTheDocument();
    });
  });
});
