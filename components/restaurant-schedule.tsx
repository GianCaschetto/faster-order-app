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

export type BranchSchedule = {
  branchId: string;
  schedule: WeekSchedule;
};

interface RestaurantScheduleProps {
  schedule?: WeekSchedule;
  branchId?: string;
  compact?: boolean;
}

// Default schedule
export const defaultSchedule: WeekSchedule = [
  { day: "Lunes", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Martes", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Miércoles", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Jueves", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Viernes", openTime: "09:00", closeTime: "23:00", isClosed: false },
  { day: "Sábado", openTime: "10:00", closeTime: "23:00", isClosed: false },
  { day: "Domingo", openTime: "10:00", closeTime: "21:00", isClosed: false },
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
        <Badge variant={isOpen ? "default" : "secondary"}>
          {isOpen ? "Abierto ahora" : "Cerrado"}
        </Badge>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" /> Horario de operación
        </CardTitle>
        <CardDescription>
          <Badge
            className={`mt-1 ${isOpen ? "bg-green-500" : ""}`}
            variant={isOpen ? "default" : "secondary"}
          >
            {isOpen ? "Abierto ahora" : "Cerrado"}
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
                {day.isClosed
                  ? "Cerrado"
                  : `${day.openTime} - ${day.closeTime}`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
