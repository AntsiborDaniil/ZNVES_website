import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AccountAuthCheckFallback from "../AccountAuthCheckFallback";

describe("AccountAuthCheckFallback", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders auth check status", () => {
    render(<AccountAuthCheckFallback />);

    expect(screen.getByRole("status", { name: "Проверяем авторизацию" })).toBeInTheDocument();
    expect(screen.getByText("Проверяем авторизацию…")).toBeInTheDocument();
  });
});
