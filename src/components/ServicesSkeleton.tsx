import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ServicesSkeleton = () => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-32 left-16 w-16 h-16 border border-primary/8 rounded-full opacity-50" />
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-primary/5 rounded-lg rotate-45" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16 sm:mb-20">
          <Skeleton className="h-12 sm:h-14 md:h-16 w-3/4 mx-auto mb-6 sm:mb-8" />
          <Skeleton className="h-6 sm:h-7 w-full max-w-4xl mx-auto mb-3" />
          <Skeleton className="h-6 sm:h-7 w-5/6 max-w-3xl mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {[...Array(6)].map((_, index) => (
            <Card 
              key={index} 
              className="luxury-card animate-pulse"
            >
              <CardHeader className="pb-4 sm:pb-6">
                {/* Icon Skeleton */}
                <Skeleton className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl mb-4 sm:mb-6" />
                {/* Title Skeleton */}
                <Skeleton className="h-7 sm:h-8 w-4/5 mb-2" />
              </CardHeader>
              <CardContent>
                {/* Description Skeleton */}
                <div className="mb-6 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                {/* Features List Skeleton */}
                <div className="space-y-2 sm:space-y-3">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <Skeleton className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-3 sm:mr-4 flex-shrink-0" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSkeleton;
