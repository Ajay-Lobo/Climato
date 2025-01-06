import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityProps {
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id:string) => void;
    }

const FavoriteCities = () => {
  const { favorites, removeFromFavorites } = useFavorite();
  if (!favorites.length) {
    return null;
  }
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
        {favorites.map((city) => (
            <FavoriteCityTablet key={city.id} {...city}
            onRemove={()=>removeFromFavorites.mutate(city.id)}/>
        ))}
        </div>
        </ScrollArea>
    </>
  );
};

function FavoriteCityTablet({id,name,lat,lon,onRemove}:FavoriteCityProps) {
    
 const navigate = useNavigate();
 const {data:weather,isLoading} = useWeatherQuery({lat,lon});
 return(
    <div onClick={()=>navigate(`/city/${name}?lat=${lat}&lon=${lon}`)} 
    role="button"
    tabIndex={0}
    className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md">
        <Button className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
            toast.error(`${name} removed from favorites`);
        }}
        ><X className="h-4 w-4"/></Button>
        {isLoading ? (
            <div className="flex h-8 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin"/>
            </div>
                ):weather ? <>
                <div className="flex items-center gap-2">
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description}
                    className="h-8 w-8"/>
                    <div>
                        <p className="font-medium ">{name}</p>
                        <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
                    </div>

                </div>
                <div className="ml-auto text-right">
                    <p className="text-xl font-bold">{Math.round(weather.main.temp)}°</p>
                    <p className="text-xs capitalize text-muted-foreground"> {weather.weather[0].description}</p>
                </div>
                </> : null
                }
    </div>
 );
}
export default FavoriteCities;
