import { useEffect } from "react";
import { initAgent } from "clippyjs";
import { Links } from "clippyjs/agents";

const ANIM_INTERVAL_MS = 6500;
const PLAY_TIMEOUT_MS = 6000;
/** Animations that remove the character */
const SKIP_ANIMATIONS = new Set(["Hide"]);

function getAgentElement(agent: Awaited<ReturnType<typeof initAgent>>): HTMLElement {
  return (agent as unknown as { _el: HTMLElement })._el;
}

function placeBottomLeft(agent: Awaited<ReturnType<typeof initAgent>>) {
  const el = getAgentElement(agent);
  if (getComputedStyle(el).display === "none") return;
  const pad = 16;
  const y = Math.max(pad, window.innerHeight - el.offsetHeight - pad);
  agent.moveTo(pad, y, 0);
}

/**
 * Microsoft Agent (Links) via [clippyjs](https://github.com/pithings/clippy): anchored bottom-left, cycling animations.
 */
export function ClippyAgent() {
  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resizeHandler: (() => void) | null = null;
    let agentInstance: Awaited<ReturnType<typeof initAgent>> | null = null;

    void (async () => {
      const agent = await initAgent(Links);
      if (cancelled) {
        agent.dispose();
        return;
      }
      agentInstance = agent;

      agent.show(true);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      placeBottomLeft(agent);

      resizeHandler = () => placeBottomLeft(agent);
      window.addEventListener("resize", resizeHandler);

      const names = agent.animations().filter((n) => !SKIP_ANIMATIONS.has(n));
      if (names.length === 0) return;

      let idx = 0;
      const playNext = () => {
        agent.stop();
        agent.play(names[idx % names.length], PLAY_TIMEOUT_MS);
        idx += 1;
      };

      playNext();
      intervalId = setInterval(playNext, ANIM_INTERVAL_MS);
    })();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      agentInstance?.dispose();
    };
  }, []);

  return null;
}
