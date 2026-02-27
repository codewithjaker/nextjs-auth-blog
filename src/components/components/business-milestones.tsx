// components/business-milestones.tsx (or place directly in your about page)
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Store, Network, MapPin, Plane, Award } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const timeline = [
  {
    year: "2012",
    event: "Founded first electronics retail store in Deira",
    icon: Store,
    location: "Dubai, Deira",
  },
  {
    year: "2015",
    event: "Established wholesale distribution network",
    icon: Network,
    location: "UAE-wide",
  },
  {
    year: "2018",
    event: "Expanded to 3 branches across UAE",
    icon: MapPin,
    location: "Dubai, Sharjah, RAK",
  },
  {
    year: "2020",
    event: "Launched import/export division",
    icon: Plane,
    location: "Global operations",
  },
  {
    year: "2023",
    event: "Reached $240M annual turnover",
    icon: TrendingUp,
    location: "Record growth",
  },
];

export function BusinessMilestones() {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center space-x-3 text-2xl font-bold">
          <div className="p-2 rounded-lg bg-primary/10">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <span>Business Milestones</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {/* Vertical timeline line with gradient */}
          <div className="absolute left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Year & Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl",
                      index % 2 === 0
                        ? "from-primary to-primary/80"
                        : "from-primary to-primary/80"
                        // : "from-secondary to-secondary/80"
                    )}>
                      <div className="text-center">
                        <div className="text-xs font-bold text-white opacity-90">
                          {item.year}
                        </div>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity -z-10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 pb-6">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.event}
                    </h3>
                    {item.location && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </p>
                    )}
                    {/* Optional subtle description (can be extended) */}
                    <div className="mt-2 h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-20 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final summary note */}
        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">12+ Years of Excellence</p>
              <p className="text-xs text-muted-foreground">Consistent growth since inception</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">$240M+</div>
        </div>
      </CardContent>
    </Card>
  );
}