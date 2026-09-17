import { describe, expect, it } from "vitest";
import {
  resolveCardImages,
  resolveGalleryImages,
} from "../productImages";

describe("productImages", () => {
  it("orders card images with is_main first, then the rest", () => {
    const urls = resolveCardImages(
      [
        { url: "/media/gallery-1.jpg", is_main: false },
        { url: "/media/main-1.jpg", is_main: true },
        { image: "/media/main-2.jpg", is_main: true },
        { url: "/media/gallery-2.jpg", is_main: false },
      ],
      "https://api.znves.ru"
    );

    expect(urls).toEqual([
      "https://api.znves.ru/media/main-1.jpg",
      "https://api.znves.ru/media/main-2.jpg",
      "https://api.znves.ru/media/gallery-1.jpg",
      "https://api.znves.ru/media/gallery-2.jpg",
    ]);
  });

  it("limits card images to 4", () => {
    const urls = resolveCardImages(
      [
        { url: "/media/m1.jpg", is_main: true },
        { url: "/media/g1.jpg", is_main: false },
        { url: "/media/g2.jpg", is_main: false },
        { url: "/media/g3.jpg", is_main: false },
        { url: "/media/g4.jpg", is_main: false },
      ],
      "https://api.znves.ru"
    );

    expect(urls).toEqual([
      "https://api.znves.ru/media/m1.jpg",
      "https://api.znves.ru/media/g1.jpg",
      "https://api.znves.ru/media/g2.jpg",
      "https://api.znves.ru/media/g3.jpg",
    ]);
  });

  it("keeps string list order for cards when no is_main flags", () => {
    const urls = resolveCardImages(
      ["/media/a.jpg", "/media/b.jpg"],
      "https://api.znves.ru"
    );
    expect(urls).toEqual([
      "https://api.znves.ru/media/a.jpg",
      "https://api.znves.ru/media/b.jpg",
    ]);
  });

  it("orders gallery with mains first", () => {
    const urls = resolveGalleryImages(
      [
        { url: "/media/g1.jpg", is_main: false },
        { url: "/media/m1.jpg", is_main: true },
        { url: "/media/g2.jpg", is_main: false },
        { url: "/media/m2.jpg", is_main: true },
      ],
      "https://api.znves.ru"
    );

    expect(urls).toEqual([
      "https://api.znves.ru/media/m1.jpg",
      "https://api.znves.ru/media/m2.jpg",
      "https://api.znves.ru/media/g1.jpg",
      "https://api.znves.ru/media/g2.jpg",
    ]);
  });
});
