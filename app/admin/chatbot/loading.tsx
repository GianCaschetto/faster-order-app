import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function ChatbotLoading() {
  return (
    <div className="container mx-auto py-6">
      <Card className="border shadow-md">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="h-6 w-6" />
            Restaurant Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex h-[calc(100vh-13rem)] flex-col">
            <div className="flex-1 p-4 space-y-4">
              {/* Mock chat messages */}
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-20 w-64 rounded-lg" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex max-w-[80%] items-start gap-3">
                  <div>
                    <Skeleton className="h-12 w-48 rounded-lg" />
                    <Skeleton className="mt-1 h-3 w-16 ml-auto" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-16 w-72 rounded-lg" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
