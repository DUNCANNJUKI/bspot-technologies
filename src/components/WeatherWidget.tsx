import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Loader2 } from 'lucide-react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  locationName: string;
}

const getWeatherIcon = (code: number, isDay: boolean) => {
  // WMO Weather interpretation codes
  if (code === 0) return <Sun className="w-4 h-4 text-yellow-400 animate-spin-slow" />;
  if (code >= 1 && code <= 3) return <Cloud className="w-4 h-4 text-primary animate-pulse" />;
  if (code >= 45 && code <= 48) return <CloudFog className="w-4 h-4 text-muted-foreground" />;
  if (code >= 51 && code <= 67) return <CloudRain className="w-4 h-4 text-blue-400 animate-bounce" style={{ animationDuration: '2s' }} />;
  if (code >= 71 && code <= 77) return <CloudSnow className="w-4 h-4 text-blue-200 animate-pulse" />;
  if (code >= 80 && code <= 82) return <CloudRain className="w-4 h-4 text-blue-500 animate-bounce" style={{ animationDuration: '1.5s' }} />;
  if (code >= 85 && code <= 86) return <CloudSnow className="w-4 h-4 text-blue-100" />;
  if (code >= 95 && code <= 99) return <CloudLightning className="w-4 h-4 text-yellow-500 animate-pulse" />;
  return <Wind className="w-4 h-4 text-muted-foreground" />;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 85 && code <= 86) return 'Snow';
  if (code >= 95 && code <= 99) return 'Storm';
  return 'Unknown';
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
        );
        if (!response.ok) return 'Unknown';
        const data = await response.json();
        return data.address?.city || data.address?.town || data.address?.county || data.address?.state || 'Unknown';
      } catch {
        return 'Unknown';
      }
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const [weatherResponse, locationName] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`),
          fetchLocationName(lat, lon)
        ]);
        
        if (!weatherResponse.ok) throw new Error('Weather fetch failed');
        
        const data = await weatherResponse.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
          locationName,
        });
        setLoading(false);
      } catch (err) {
        setError('Unable to load weather');
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        // Default to Nairobi, Kenya if geolocation not available
        fetchWeather(-1.2921, 36.8219);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Nairobi, Kenya on error
          fetchWeather(-1.2921, 36.8219);
        },
        { timeout: 5000 }
      );
    };

    getLocation();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(() => {
      getLocation();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20 backdrop-blur-sm border border-secondary/30">
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20 backdrop-blur-sm border border-secondary/30 shadow-lg shadow-secondary/10 animate-pulse-glow group cursor-default transition-all duration-300 hover:scale-105">
      <div className="transition-transform duration-300 group-hover:scale-125">
        {getWeatherIcon(weather.weatherCode, weather.isDay)}
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="text-sm font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent tabular-nums">
          {weather.temperature}°C
        </span>
        <span className="text-xs text-muted-foreground hidden lg:inline">
          {getWeatherDescription(weather.weatherCode)}
        </span>
        <span className="text-xs text-primary/70 hidden xl:inline border-l border-secondary/30 pl-1.5">
          {weather.locationName}
        </span>
      </div>
    </div>
  );
}
