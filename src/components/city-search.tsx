import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/use-favorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSearch = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split(" | ");
    addToHistory.mutate({
      query,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const {favorites} = useFavorite();
  return (
    <>
      <Button
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" /> Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities Found.</CommandEmpty>
          )}


{favorites.length > 0 && (
           
              <CommandGroup heading="Favorites">
                
                {favorites.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat} | ${item.lon} | ${item.name} | ${item.country}`}
                    onSelect={handleSearch}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-sm text-muted-foreground">
                        , {item.state}
                      </span>
                    )}
                    <span
                      className="text-sm 
                    text-muted-foreground"
                    >
                      , {item.country}
                    </span >
                    
                  </CommandItem>
                ))}
              </CommandGroup>
            
          )}


          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div>
                  <p>Recent Searches</p>
                  <Button
                    variant="ghost"
                    size={"sm"}
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat} | ${item.lon} | ${item.name} | ${item.country}`}
                    onSelect={handleSearch}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-sm text-muted-foreground">
                        , {item.state}
                      </span>
                    )}
                    <span
                      className="text-sm 
                    text-muted-foreground"
                    >
                      , {item.country}
                    </span >
                    <span className="ml-auto text-xs text-muted-foreground">{format(item.searchedAt, "MMM d, h:mm a")}</span>
                  </CommandItem>
                ))}
                
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2 className="animate-spin h-4 w-4" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                    onSelect={handleSearch}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span
                      className="text-sm 
                    text-muted-foreground"
                    >
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
