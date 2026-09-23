export default function NewInLoading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        color: "#999",
        fontFamily: "var(--font-inter), sans-serif",
        fontWeight: 300,
        letterSpacing: "0.04em",
      }}
      aria-busy
      aria-label="Загрузка новинок"
    >
      Загрузка…
    </div>
  );
}
