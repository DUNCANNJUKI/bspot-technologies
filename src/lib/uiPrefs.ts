// Persistent UI preferences (localStorage). Read synchronously, written via setters.
const KEY = "btextman.ui.prefs.v1";

export type UiPrefs = {
  showMessagesPage: boolean;
};

const DEFAULTS: UiPrefs = {
  showMessagesPage: false,
};

export function getUiPrefs(): UiPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function setUiPref<K extends keyof UiPrefs>(k: K, v: UiPrefs[K]) {
  const next = { ...getUiPrefs(), [k]: v };
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("btextman-ui-prefs"));
}

export function useUiPrefs(): UiPrefs {
  const [prefs, setPrefs] = (require("react") as typeof import("react")).useState<UiPrefs>(() => getUiPrefs());
  (require("react") as typeof import("react")).useEffect(() => {
    const handler = () => setPrefs(getUiPrefs());
    window.addEventListener("btextman-ui-prefs", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("btextman-ui-prefs", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return prefs;
}
