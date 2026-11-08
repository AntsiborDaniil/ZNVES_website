"use client";

export default function GlobalError() {
  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", padding: "15vh 24px", textAlign: "center" }}>
        <h1>Не удалось загрузить страницу</h1>
        <p>Возможно, сайт обновился. Обновите страницу, чтобы продолжить.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "16px 24px", background: "#000", color: "#fff", border: 0, cursor: "pointer" }}>
          Обновить страницу
        </button>
      </body>
    </html>
  );
}
