export function getWeatherDescription(code: number) {
  const map: { [key: number]: { title: string; sub: string } } = {
    0: { title: "Clear Sky", sub: "Bright & Sunny" },
    1: { title: "Mainly Clear", sub: "Mostly Sunny" },
    2: { title: "Partly Cloudy", sub: "Mildly Cloudy" },
    3: { title: "Overcast", sub: "Cloud-Dominated" },
    45: { title: "Foggy", sub: "Low Visibility" },
    48: { title: "Rime Fog", sub: "Icy Fog" },
    51: { title: "Light Drizzle", sub: "Slight Wetness" },
    53: { title: "Moderate Drizzle", sub: "Steady Drizzle" },
    55: { title: "Dense Drizzle", sub: "Almost Rain" },
    61: { title: "Light Rain", sub: "Gentle Showers" },
    63: { title: "Moderate Rain", sub: "Steady Showers" },
    65: { title: "Heavy Rain", sub: "Intense Downpour" },
    71: { title: "Light Snow", sub: "Gentle Snowfall" },
    73: { title: "Moderate Snow", sub: "Steady Snow" },
    75: { title: "Heavy Snow", sub: "Blizzard-like" },
    77: { title: "Snow Grains", sub: "Tiny Snow Particles" },
    80: { title: "Light Showers", sub: "Quick Rain" },
    81: { title: "Moderate Showers", sub: "Frequent Showers" },
    82: { title: "Violent Showers", sub: "Stormy Rain" },
    95: { title: "Thunderstorm", sub: "Stormy Weather" },
    96: { title: "Thunderstorm with Hail", sub: "Severe Storm" },
    99: { title: "Severe Thunderstorm", sub: "Extreme Danger" },
  };

  return (
    map[code] || {
      title: "Unknown",
      sub: "Unclassified Weather",
    }
  );
}
