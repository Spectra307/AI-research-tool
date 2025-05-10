import React, { useState } from "react";
import { MoonIcon, SunIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import PaperCard from "./PaperCard";
import SearchFilters from "./SearchFilters";
import PaperViewer from "./PaperViewer";

const mockPapers = [
  {
    id: "1",
    title: "Attention Is All You Need",
    authors: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
    ],
    date: "2017-06-12",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism...",
    url: "https://arxiv.org/pdf/1706.03762.pdf",
  },
  {
    id: "2",
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: [
      "Jacob Devlin",
      "Ming-Wei Chang",
      "Kenton Lee",
      "Kristina Toutanova",
    ],
    date: "2018-10-11",
    abstract:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations...",
    url: "https://arxiv.org/pdf/1810.04805.pdf",
  },
  {
    id: "3",
    title: "GPT-3: Language Models are Few-Shot Learners",
    authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"],
    date: "2020-05-28",
    abstract:
      "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets...",
    url: "https://arxiv.org/pdf/2005.14165.pdf",
  },
  {
    id: "4",
    title: "Deep Residual Learning for Image Recognition",
    authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
    date: "2015-12-10",
    abstract:
      "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions...",
    url: "https://arxiv.org/pdf/1512.03385.pdf",
  },
  {
    id: "5",
    title: "Generative Adversarial Networks",
    authors: [
      "Ian J. Goodfellow",
      "Jean Pouget-Abadie",
      "Mehdi Mirza",
      "Bing Xu",
    ],
    date: "2014-06-10",
    abstract:
      "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability...",
    url: "https://arxiv.org/pdf/1406.2661.pdf",
  },
  {
    id: "6",
    title:
      "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
    authors: ["Zihang Dai", "Zhilin Yang", "Yiming Yang", "Jaime Carbonell"],
    date: "2019-01-09",
    abstract:
      "Transformers have a potential of learning longer-term dependency, but are limited by a fixed-length context in the setting of language modeling. We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length...",
    url: "https://arxiv.org/pdf/1901.02860.pdf",
  },
];

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<
    (typeof mockPapers)[0] | null
  >(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Filter papers based on search term
  const filteredPapers = mockPapers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const handlePaperSelect = (paper: (typeof mockPapers)[0]) => {
    setSelectedPaper(paper);
    setViewerOpen(true);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply the theme to the document here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Paper Summarizer</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search papers by title, author, or keywords..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {showFilters && (
            <SearchFilters onClose={() => setShowFilters(false)} />
          )}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Results ({filteredPapers.length})
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onView={() => handlePaperSelect(paper)}
              />
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <Card className="bg-muted">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">
                  No papers found matching your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      {selectedPaper && (
        <PaperViewer
          paper={selectedPaper}
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
