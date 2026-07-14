import { describe, expect, it } from "vitest";
import {
  getSiteUrl,
  ROBOTS_DISALLOW_PATHS,
  STATIC_SITEMAP_PATHS,
} from "../siteConfig";

describe("siteConfig", () => {
  it("returns default site URL when env is missing", () => {
    expect(getSiteUrl()).toBe("https://znves.ru");
  });

  it("includes public catalog routes in sitemap paths", () => {
    expect(STATIC_SITEMAP_PATHS).toContain("/catalog");
    expect(STATIC_SITEMAP_PATHS).toContain("/new-in");
  });

  it("disallows private account and checkout routes", () => {
    expect(ROBOTS_DISALLOW_PATHS).toContain("/account");
    expect(ROBOTS_DISALLOW_PATHS).toContain("/checkout");
    expect(ROBOTS_DISALLOW_PATHS).toContain("/cart");
  });
});
