import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bookmark, FileText, Trash2, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  tags: string[];
  hasSummary: boolean;
}

interface LibraryProps {
  savedPapers?: Paper[];
  onViewPaper?: (paperId: string) => void;
  onDeletePaper?: (paperId: string) => void;
  onExportSummary?: (paperId: string) => void;
}

const Library = ({
  savedPapers = [
    {
      id: "1",
      title: "Attention Is All You Need",
      authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"],
      date: "2023-06-12",
      abstract:
        "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism...",
      tags: ["NLP", "Transformers", "Deep Learning"],
      hasSummary: true,
    },
    {
      id: "2",
      title:
        "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee"],
      date: "2022-10-11",
      abstract:
        "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations...",
      tags: ["NLP", "BERT", "Language Models"],
      hasSummary: true,
    },
    {
      id: "3",
      title: "GPT-4 Technical Report",
      authors: ["OpenAI"],
      date: "2023-03-27",
      abstract:
        "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs. While less capable than humans in many real-world scenarios, GPT-4 exhibits human-level performance on various professional and academic benchmarks...",
      tags: ["GPT", "Large Language Models", "AI"],
      hasSummary: false,
    },
  ],
  onViewPaper = () => {},
  onDeletePaper = () => {},
  onExportSummary = () => {},
}: LibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPapers = savedPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "with-summaries")
      return matchesSearch && paper.hasSummary;

    return false;
  });

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg border">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Library</h2>
          <div className="relative w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Papers</TabsTrigger>
            <TabsTrigger value="with-summaries">With Summaries</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[600px] pr-4">
              {filteredPapers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredPapers.map((paper) => (
                    <LibraryPaperCard
                      key={paper.id}
                      paper={paper}
                      onView={() => onViewPaper(paper.id)}
                      onDelete={() => onDeletePaper(paper.id)}
                      onExport={
                        paper.hasSummary
                          ? () => onExportSummary(paper.id)
                          : undefined
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">No saved papers found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchTerm
                      ? "Try a different search term"
                      : "Save papers to your library to view them here"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="with-summaries" className="mt-4">
            <ScrollArea className="h-[600px] pr-4">
              {filteredPapers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredPapers.map((paper) => (
                    <LibraryPaperCard
                      key={paper.id}
                      paper={paper}
                      onView={() => onViewPaper(paper.id)}
                      onDelete={() => onDeletePaper(paper.id)}
                      onExport={() => onExportSummary(paper.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">
                    No papers with summaries
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Generate summaries for your saved papers to see them here
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface LibraryPaperCardProps {
  paper: Paper;
  onView: () => void;
  onDelete: () => void;
  onExport?: () => void;
}

const LibraryPaperCard = ({
  paper,
  onView,
  onDelete,
  onExport,
}: LibraryPaperCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{paper.title}</CardTitle>
            <CardDescription className="mt-1">
              {paper.authors.join(", ")} • {paper.date}
            </CardDescription>
          </div>
          {paper.hasSummary && (
            <Badge variant="secondary" className="ml-2">
              Summary Available
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {paper.abstract}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {paper.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onView}>
          View Paper
        </Button>
        <div className="flex gap-2">
          {onExport && (
            <Button variant="ghost" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" />
              Export Summary
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Library;
