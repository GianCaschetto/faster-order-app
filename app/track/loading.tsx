import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-2" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[150px] w-full rounded-lg" />
      </div>
    </div>
  )
}

