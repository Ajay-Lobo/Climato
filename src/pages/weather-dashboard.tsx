import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {

  const {coordinates,error:locationError, getLocation, isLoading:locationLoading} = useGeolocation();

  const handleRefresh = () => {
    getLocation();
    if(coordinates){
      // Fetch weather data
    }
  };
if(locationLoading){
  return <WeatherSkeleton/>;
}

if(locationError){
 return ( <Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Location Error</AlertTitle>
  <AlertDescription className="flex flex-col gap-4">
    <p>{locationError}</p>
    <Button onClick={getLocation} variant={"outline"} className="w-fit">
      <MapPin className="mr-2 h-4 w-4"/>
      Enable Location
    </Button>
  </AlertDescription>
</Alert>);
}

if(!coordinates){
  return ( <Alert variant="destructive">
    <AlertTitle>Location Required</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>please enable location access to see your local weather</p>
      <Button onClick={getLocation} variant={"outline"} className="w-fit">
        <MapPin className="mr-2 h-4 w-4"/>
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>);
}


  return <div className="space-y-4">
    {/* Favorite Cities */}
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight">My Location</h1>
      <Button variant={'outline'} size={'icon'}//onclick={refreshLocation}
      // disabled={false}
      ><RefreshCw className="h-4 w-4"/></Button>
    
    </div>
    {/* Current and Hourly Forecast */}
  </div>;
};

export default WeatherDashboard;
