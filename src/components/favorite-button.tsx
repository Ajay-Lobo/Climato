import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
  const handleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFromFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`${data.name} removed from favorites`);
    } else {
      addToFavorites.mutate({
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        country: data.sys.country,
      });
        toast.success(`${data.name} added to favorites`);
    }
  };
  return (
    <>
      <Button
        variant={isCurrentlyFavorite ? "default" : "outline"}
        size={"icon"}
        onClick={handleFavorite}
        className={
          isCurrentlyFavorite ? "text-yellow-500 hover:bg-yellow-600" : ""
        }
      >
        <Star
          className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
        />
      </Button>
    </>
  );
};

export default FavoriteButton;
