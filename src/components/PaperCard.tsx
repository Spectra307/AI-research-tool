import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaperCardProps {
  title: string;
  authors: string[];
  publicationDate: string;
  abstract: string;
  subject?: string;
  isFavorite?: boolean;
  onViewPaper?: () => void;
  onToggleFavorite?: () => void;
}

const PaperCard = ({
  title = "Understanding Deep Learning Requires Rethinking Generalization",
  authors = [
    "Zhang, C.",
    "Bengio, S.",
    "Hardt, M.",
    "Recht, B.",
    "Vinyals, O.",
  ],
  publicationDate = "2017-02-15",
  abstract = "Despite their massive size, successful deep artificial neural networks can exhibit a remarkably small difference between training and test performance. Conventional wisdom attributes small generalization error either to properties of the model family or to the regularization techniques used during training...",
  subject = "Computer Science",
  isFavorite = false,
  onViewPaper = () => {},
  onToggleFavorite = () => {},
}: PaperCardProps) => {
  return (
    <Card className="w-[350px] h-[220px] flex flex-col bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2" title={title}>
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-yellow-500"
            onClick={onToggleFavorite}
          >
            <Star
              className={isFavorite ? "fill-yellow-500 text-yellow-500" : ""}
              size={18}
            />
          </Button>
        </div>
        <CardDescription className="text-xs">
          {authors.slice(0, 3).join(", ")}
          {authors.length > 3 && ` + ${authors.length - 3} more`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-3 text-muted-foreground">{abstract}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {subject}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon size={12} className="mr-1" />
            {publicationDate}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={onViewPaper}
        >
          <BookOpen size={14} className="mr-1" />
          View Paper
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaperCard;
