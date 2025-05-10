import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkIcon,
  Download,
  Highlighter,
  MessageSquareText,
  Share2,
} from "lucide-react";

interface PaperViewerProps {
  isOpen?: boolean;
  onClose?: () => void;
  paper?: {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    publicationDate: string;
    pdfUrl: string;
  };
}

const PaperViewer = ({
  isOpen = true,
  onClose = () => {},
  paper = {
    id: "123",
    title: "Attention Is All You Need",
    authors: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
      "Llion Jones",
      "Aidan N. Gomez",
      "Łukasz Kaiser",
      "Illia Polosukhin",
    ],
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely...",
    publicationDate: "2017-06-12",
    pdfUrl: "#",
  },
}: PaperViewerProps) => {
  const [activeTab, setActiveTab] = useState("pdf");
  const [isSaved, setIsSaved] = useState(false);
  const [isSummarySaved, setIsSummarySaved] = useState(false);

  // Mock summary data
  const summary = [
    "Introduces the Transformer architecture that relies entirely on attention mechanisms without recurrence or convolutions",
    "Achieves state-of-the-art results on machine translation tasks with significantly less training time",
    "Uses multi-head self-attention to allow the model to focus on different positions and representations",
    "Implements positional encoding to retain sequence order information",
    "Demonstrates superior performance on English-to-German and English-to-French translation tasks",
    "Requires less computational resources for training compared to previous architectures",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl h-[80vh] p-0 bg-background">
        <DialogHeader className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <DialogTitle className="text-2xl font-bold">
                {paper.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {paper.authors.join(", ")} • {paper.publicationDate}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
              >
                <BookmarkIcon
                  className={`h-4 w-4 mr-2 ${isSaved ? "fill-primary" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => onClose()}>
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-6">
            <TabsList className="bg-transparent border-b-0">
              <TabsTrigger
                value="pdf"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                PDF View
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Summary
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pdf" className="p-0 h-[calc(80vh-140px)]">
            <div className="flex h-full">
              <div className="w-full h-full relative">
                {/* PDF Viewer */}
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <iframe
                    src="https://arxiv.org/pdf/1706.03762.pdf"
                    className="w-full h-full"
                    title="PDF Viewer"
                  />
                </div>

                {/* PDF Controls */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
                  <Button variant="ghost" size="icon" title="Highlight Text">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Add Annotation">
                    <MessageSquareText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="p-6 h-[calc(80vh-140px)]">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    AI-Generated Summary
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSummarySaved(!isSummarySaved)}
                  >
                    {isSummarySaved ? "Summary Saved" : "Save Summary"}
                  </Button>
                </div>
                <Separator className="mb-4" />
                <ScrollArea className="h-[calc(80vh-240px)]">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      Key points extracted from "{paper.title}"
                    </p>
                    <ul className="space-y-3 list-disc pl-5">
                      {summary.map((point, index) => (
                        <li key={index} className="text-base">
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-2">Abstract</h4>
                      <p className="text-sm text-muted-foreground">
                        {paper.abstract}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PaperViewer;
