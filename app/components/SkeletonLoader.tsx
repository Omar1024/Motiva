export default function SkeletonLoader() {
  return (
    <div className="card p-6 sm:p-8 lg:p-12 min-h-[240px] sm:min-h-[320px] flex flex-col justify-center animate-pulse">
      {/* Quote skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-6 bg-white bg-opacity-20 rounded-lg w-3/4 mx-auto"></div>
        <div className="h-6 bg-white bg-opacity-20 rounded-lg w-full mx-auto"></div>
        <div className="h-6 bg-white bg-opacity-20 rounded-lg w-5/6 mx-auto"></div>
      </div>
      
      {/* Author skeleton */}
      <div className="flex justify-center mb-4">
        <div className="h-4 bg-white bg-opacity-20 rounded-lg w-32"></div>
      </div>
      
      {/* Badge skeleton */}
      <div className="flex justify-center">
        <div className="h-6 bg-white bg-opacity-20 rounded-full w-24"></div>
      </div>
    </div>
  )
}


