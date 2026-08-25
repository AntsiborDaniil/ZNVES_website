import { describe, expect, it } from "vitest";
import { resolveCollectionHref } from "../CollectionBanner";

describe("resolveCollectionHref", () => {
  it("always returns /catalog without category params", () => {
    expect(
      resolveCollectionHref({
        title: "Ski suit",
        image: "/x.png",
        href: "/catalog?category=jackets",
      })
    ).toBe("/catalog");

    expect(
      resolveCollectionHref({
        title: "BAG SQUARE",
        image: "/x.png",
        href: "/catalog?category=bags",
      })
    ).toBe("/catalog");

    expect(
      resolveCollectionHref({
        title: "Anything",
        image: "/x.png",
        href: "/catalog",
      })
    ).toBe("/catalog");
  });
});
