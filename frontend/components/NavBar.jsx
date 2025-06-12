import React from "react";
import RotatingSentences from "./child_components/RotatingSentences";

function NavBar({ theme, setTheme }) {
  const themes = [
    "pastel",
    "retro",
    "coffee",
    "forest",
    "cyberpunk",
    "synthwave",
    "luxury",
    "autumn",
    "aqua",
    "business",
    "dracula",
    "light",
    "cupcake",
    "valentine",
    "night",
  ];

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b-2 border-y-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem]">
          {/* LEFT  */}
          <div className="navbar-start">
            <a
              className="font-semibold tracking-normal font-mono text-3xl
                         bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Flea Market
            </a>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:block md:block ">
            <p className="text-center">
              <RotatingSentences />
            </p>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-4">
            <select
              className="select w-32 select-neutral"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="menu menu-horizontal px-1">
              <p>by risfandi_lase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
