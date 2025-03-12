"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type DaySchedule = {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export type WeekSchedule = DaySchedule[];

interface RestaurantScheduleProps {
  schedule?: WeekSchedule;
  compact?: boolean;
}

// Default schedule
export const defaultSchedule: WeekSchedule = [
  { day: "Monday", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Tuesday", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Wednesday", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Thursday", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Friday", openTime: "09:00", closeTime: "23:00", isClosed: false },
  { day: "Saturday", openTime: "10:00", closeTime: "23:00", isClosed: false },
  { day: "Sunday", openTime: "10:00", closeTime: "21:00", isClosed: false },
];

export default function RestaurantSchedule({
  schedule = defaultSchedule,
  compact = false,
}: RestaurantScheduleProps) {
  const [currentDay, setCurrentDay] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const now = new Date();
    const dayName = days[now.getDay()];
    setCurrentDay(dayName);

    // Check if restaurant is currently open
    const todaySchedule = schedule.find((day) => day.day === dayName);
    if (todaySchedule && !todaySchedule.isClosed) {
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [openHour, openMinute] = todaySchedule.openTime
        .split(":")
        .map(Number);
      const [closeHour, closeMinute] = todaySchedule.closeTime
        .split(":")
        .map(Number);

      const openTimeMinutes = openHour * 60 + openMinute;
      const closeTimeMinutes = closeHour * 60 + closeMinute;

      setIsOpen(
        currentTime >= openTimeMinutes && currentTime < closeTimeMinutes
      );
    } else {
      setIsOpen(false);
    }

    // We don't need to set up an interval here since the parent component already has one
  }, [schedule]); // Only depend on schedule changes

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Badge variant={isOpen ? "default" : "destructive"}>
          {isOpen ? "Open Now" : "Closed"}
        </Badge>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" /> Hours of Operation
        </CardTitle>
        <CardDescription>
          <Badge variant={isOpen ? "default" : "destructive"} className="mt-1">
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {schedule.map((day) => (
            <div
              key={day.day}
              className={`flex justify-between ${
                day.day === currentDay ? "font-bold" : ""
              }`}
            >
              <span>{day.day}</span>
              <span>
                {day.isClosed ? "Closed" : `${day.openTime} - ${day.closeTime}`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
