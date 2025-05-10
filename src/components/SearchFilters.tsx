import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, FilterIcon, X } from "lucide-react";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SearchFiltersProps {
  onApplyFilters?: (filters: {
    dateRange: { from?: Date; to?: Date } | undefined;
    author: string;
    subject: string;
  }) => void;
  onResetFilters?: () => void;
}

const SearchFilters = ({
  onApplyFilters = () => {},
  onResetFilters = () => {},
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>();
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "Medicine",
    "Economics",
    "Psychology",
    "Engineering",
    "Social Sciences",
  ];

  const handleApplyFilters = () => {
    onApplyFilters({
      dateRange,
      author,
      subject,
    });
  };

  const handleResetFilters = () => {
    setDateRange(undefined);
    setAuthor("");
    setSubject("");
    onResetFilters();
  };

  return (
    <div className="w-full bg-background border rounded-lg p-4 mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Filters</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              {isOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Publication Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                          {format(dateRange.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Author Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Author</label>
              <div className="flex">
                <Input
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full"
                />
                {author && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => setAuthor("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Subject Area Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject Area</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject area" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SearchFilters;
