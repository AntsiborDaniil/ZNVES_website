import { describe, expect, it } from "vitest";
import { resolveCollectionHref } from "../CollectionBanner";

describe("resolveCollectionHref", () => {
  it("uses category from title when href is bare /catalog", () => {
    expect(
      resolveCollectionHref({
        title: "Ski suit",
        image: "/x.png",
        href: "/catalog",
      })
    ).toBe("/catalog?category=jackets");

    expect(
      resolveCollectionHref({
        title: "BAG SQUARE",
        image: "/x.png",
        href: "/catalog",
      })
    ).toBe("/catalog?category=bags");
  });

  it("keeps href that already has category", () => {
    expect(
      resolveCollectionHref({
        title: "Anything",
        image: "/x.png",
        href: "/catalog?category=hoodies",
      })
    ).toBe("/catalog?category=hoodies");
  });
});
