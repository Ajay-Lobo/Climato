import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteItem {
    id: string;
    name: string;
    lat: number;
    lon: number;
    country:string,
    state?:string,
    addedAt: number;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
        "favorites",
        []
    );

    const queryClient = useQueryClient();

    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity,
    });

    const addToFavorites = useMutation({
        mutationFn: async (
            favorite: Omit<FavoriteItem, "id" | "addedAt">
        ) => {
            const newFavorite: FavoriteItem = {
                ...favorite,
                id: `${favorite.lat}-${favorite.lon}`,
                addedAt: Date.now(),
            };
            const exists = favorites.some( (item) => item.id === newFavorite.id);
            if (exists) {
                return favorites;
            }
            const newFavorites = [ ...favorites,newFavorite,].slice(0, 10);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });

    const removeFromFavorites = useMutation({
        mutationFn: async (id: string) => {
            const newFavorites = favorites.filter((item) => item.id !== id);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });

    return {
        favorites: favoritesQuery.data,
        addToFavorites,
        removeFromFavorites,
        isFavorite: (lat:number,lon:number) => {
           return favorites.some((item) => item.lat === lat && item.lon === lon);
        },
    };
}