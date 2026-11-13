"use client";
import { useEffect, useState } from "react";
import "./weather-atmosphere.css";

type Weather = "clear" | "cloudy" | "rain" | "snow";
const interpret = (code: number): Weather =>
  [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code) ? "rain" :
  [71,73,75,77,85,86].includes(code) ? "snow" :
  [1,2,3,45,48].includes(code) ? "cloudy" : "clear";

/** City-level weather only; no precise geolocation, API key, or paid service. */
export default function WeatherAtmosphere({ light }: { light: boolean }) {
  const [weather, setWeather] = useState<Weather>("clear");
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const load = async () => {
      try {
        const cacheKey = "evo-weather-bengaluru-v1";
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const value = JSON.parse(cached) as { at: number; code: number };
          if (Date.now() - value.at < 30 * 60_000) {
            if (active) setWeather(interpret(value.code));
            return;
          }
        }
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=weather_code&timezone=Asia%2FKolkata", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        const code = data?.current?.weather_code;
        if (typeof code !== "number") return;
        sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), code }));
        if (active) setWeather(interpret(code));
      } catch { /* Network unavailable: retain clear-sky fallback. */ }
    };
    void load();
    return () => { active = false; controller.abort(); };
  }, []);
  return <div className={`evo-weather evo-weather--${weather} ${light ? "evo-weather--day" : "evo-weather--night"}`} aria-hidden="true">
    <div className="evo-weather-glow" />
    {weather === "rain" && <div className="evo-weather-rain" />}
    {weather === "snow" && <div className="evo-weather-snow" />}
    {weather === "cloudy" && <div className="evo-weather-cloud" />}
  </div>;
}
