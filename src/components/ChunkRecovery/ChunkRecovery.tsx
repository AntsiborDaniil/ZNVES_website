/** Runs before application chunks, including when React itself cannot load. */
export const CHUNK_RECOVERY_SCRIPT = String.raw`(function () {
  var marker = "__znves_reload";
  var storageKey = "znves:chunk-recovery";
  var recovering = false;
  function recover() {
    if (recovering) return;
    try {
      var now = Date.now();
      var previous = Number(window.sessionStorage.getItem(storageKey) || 0);
      if (previous && now - previous < 60000) return;
      window.sessionStorage.setItem(storageKey, String(now));
      recovering = true;
      var fresh = new URL(window.location.href);
      fresh.searchParams.set(marker, String(now));
      window.location.replace(fresh.toString());
    } catch (_) { /* Error boundary offers a manual refresh when storage is blocked. */ }
  }
  window.addEventListener("error", function (event) {
    var target = event.target;
    if (target && target.tagName === "SCRIPT" && /\/_next\/static\/.*\.js(?:\?|$)/.test(target.src || "")) recover();
  }, true);
  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    var text = reason && (reason.message || reason.name) || String(reason || "");
    if (/ChunkLoadError|Loading chunk [\w-]+ failed|Failed to fetch dynamically imported module/i.test(text)) recover();
  });
})();`;

export default function ChunkRecovery() {
  return <script id="znves-chunk-recovery" dangerouslySetInnerHTML={{ __html: CHUNK_RECOVERY_SCRIPT }} />;
}
