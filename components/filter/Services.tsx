"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { ServiceButton } from "./ServiceButton";
import { FilterButton } from "./FilterButton";
import { Select } from "@/components/ui/select";

interface Service {
  id: string;
  name: string;
  category?: string;
}

const services: Service[] = [
  { id: "chef-at-home", name: "Chef at Home", category: "menu" },
  { id: "large-event", name: "Large Event", category: "menu" },
  { id: "meal-prep", name: "Meal Prep", category: "menu" },
  { id: "meal-delivery", name: "Meal Delivery", category: "menu" },
  { id: "fine-dining", name: "Fine Dining", category: "menu" },
  { id: "corporate-dining", name: "Corporate Dining", category: "menu" },
  { id: "cooking-class", name: "Cooking Class", category: "service" },
  { id: "eating-coach", name: "Eating Coach", category: "service" },
  { id: "box-groceries", name: "Box Groceries", category: "service" },
  { id: "chefs", name: "CHEFS", category: "profile" },
];

interface ServicesProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  orderBy?: string;
  onOrderByChange?: (value: string) => void;
}

export function Services({
  selectedService,
  onServiceChange,
  orderBy = "Most Popular",
  onOrderByChange,
}: ServicesProps) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const handleCustomBookingClick = () => {
    router.push("/booking/custom");
  };

  const handleServiceClick = (serviceId: string) => {
    onServiceChange(serviceId);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const sortOptions = [
    { key: "Most Popular", label: "Most Popular" },
    { key: "Recently Added", label: "Latest" },
  ];

  const handleSortChange = (value: string) => {
    onOrderByChange?.(value);
  };

  return (
    <>
      <nav
        className="w-full overflow-x-auto hide-scrollbar"
        role="navigation"
        aria-label="Chef services navigation"
      >
        <div className="flex items-center gap-2 overflow-x-auto py-4 hide-scrollbar px-12 max-md:px-6 max-sm:px-4 min-w-max w-full">
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              isActive={selectedService === service.id}
              onClick={() => handleServiceClick(service.id)}
              aria-pressed={selectedService === service.id}
              aria-label={`Select ${service.name} service`}
            >
              {service.name}
            </ServiceButton>
          ))}
          <div
            className="aspect-[0.02] object-contain w-px stroke-[1px] stroke-[#CFCFCE] shrink-0 bg-[#CFCFCE] ml-auto"
            role="separator"
            aria-orientation="vertical"
          />
          <FilterButton
            isActive={isFilterOpen}
            onClick={handleFilterClick}
            aria-expanded={isFilterOpen}
            aria-label="Toggle filters"
          >
            Filter
          </FilterButton>
        </div>
      </nav>

      {/* Title, custom booking, and sort select row */}
      <div className="px-12 max-md:px-6 max-sm:px-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:items-center w-full max-w-[1440px] mx-auto">
          <h1 className="text-xl font-bold w-full md:w-1/4">
            {services.find((service) => service.id === selectedService)?.name}
          </h1>

          <div className="w-full md:w-2/4 flex justify-between items-center rounded-full border-1 py-2 px-4">
            <div className="w-2/3 text-xs sm:text-sm">
              Cant find what you want? use the custom booking
            </div>
            <Button
              radius="full"
              size="sm"
              className="bg-yellow-400 text-white"
              onClick={handleCustomBookingClick}
            >
              Custom Booking
            </Button>
          </div>

          <div className="flex w-full md:w-1/4 mt-2 md:mt-0 justify-end">
            <Select
              options={sortOptions}
              value={orderBy}
              onChange={handleSortChange}
              placeholder="Sort by"
              className="w-full max-w-full md:max-w-40"
            />
          </div>
        </div>
      </div>
    </>
  );
}
