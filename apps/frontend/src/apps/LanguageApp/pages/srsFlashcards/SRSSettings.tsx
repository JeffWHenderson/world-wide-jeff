import { useEffect, useRef, useState } from "react";
import { useLanguageApp } from "../../LanguageAppContext";

const SRSSettings = () => {
    const { ttsEnabled, setTtsEnabled, autoplay, setAutoplay, volume, setVolume } = useLanguageApp();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div className="srs-settings-wrap" ref={ref}>
            <button
                className={`srs-settings-btn ${open ? "active" : ""}`}
                onClick={() => setOpen((v) => !v)}
                title="Settings"
                aria-label="Settings"
            >
                ⚙
            </button>
            {open && (
                <div className="srs-settings-dropdown">
                    <div className="srs-settings-row">
                        <div className="srs-settings-label-group">
                            <span className="srs-settings-label">Text to Speech</span>
                            <span className="srs-settings-sub">Read cards aloud</span>
                        </div>
                        <label className="srs-toggle">
                            <input
                                type="checkbox"
                                checked={ttsEnabled}
                                onChange={(e) => setTtsEnabled(e.target.checked)}
                            />
                            <span className="srs-toggle-track" />
                        </label>
                    </div>

                    <div className="srs-settings-row">
                        <div className="srs-settings-label-group">
                            <span className="srs-settings-label">Autoplay</span>
                            <span className="srs-settings-sub">Passive listen — all cards, no ratings</span>
                        </div>
                        <label className="srs-toggle">
                            <input
                                type="checkbox"
                                checked={autoplay}
                                onChange={(e) => setAutoplay(e.target.checked)}
                            />
                            <span className="srs-toggle-track" />
                        </label>
                    </div>

                    <div className="srs-settings-row srs-settings-volume">
                        <span className="srs-settings-label">Volume</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="srs-volume-slider"
                        />
                        <span className="srs-volume-val">{Math.round(volume * 100)}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SRSSettings;
