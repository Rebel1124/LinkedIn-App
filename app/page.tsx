"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, Youtube, Edit, RefreshCw, FileText, ExternalLink } from "lucide-react"
import { Crown, Star, Zap } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GeneratedPost {
  id: string
  content: string
  image: string
  theme: string
}

const themes = [
  { value: "ai-coding", label: "AI & Coding", color: "bg-blue-100 text-blue-800" },
  { value: "financial", label: "Financial Markets", color: "bg-green-100 text-green-800" },
  { value: "investing", label: "Investing", color: "bg-purple-100 text-purple-800" },
]

const mockPosts = {
  "ai-coding": [
    {
      id: "1",
      content:
        "🚀 Just discovered an amazing new AI tool that's revolutionizing how we code! The future of software development is here, and it's more exciting than ever.\n\n💡 Key benefits:\n• 10x faster development\n• Fewer bugs and errors\n• Better code quality\n\nWhat AI tools are you using in your workflow? Share your experiences below! 👇\n\n#AI #Coding #SoftwareDevelopment #Tech #Innovation",
      image: "/placeholder.svg?height=400&width=600",
      theme: "AI & Coding",
    },
    {
      id: "2",
      content:
        "🔥 Hot take: The developers who embrace AI today will be the leaders of tomorrow.\n\nI've been experimenting with AI-powered coding assistants, and the productivity gains are incredible. But here's the thing - it's not about replacing developers, it's about amplifying our capabilities.\n\n🎯 My top 3 AI coding tips:\n1. Use AI for boilerplate code\n2. Let AI help with debugging\n3. Leverage AI for code reviews\n\nThe future belongs to those who adapt. Are you ready?\n\n#ArtificialIntelligence #Programming #FutureOfWork #TechTrends",
      image: "/placeholder.svg?height=400&width=600",
      theme: "AI & Coding",
    },
    {
      id: "3",
      content:
        "💻 Remember when we thought coding was just about syntax and algorithms?\n\nToday's reality: AI is transforming every aspect of software development. From intelligent code completion to automated testing, we're witnessing a paradigm shift.\n\n🌟 What excites me most:\n• AI-generated documentation\n• Automated code optimization\n• Intelligent bug detection\n• Natural language to code conversion\n\nThe question isn't whether AI will change coding - it's how quickly we can adapt to leverage its power.\n\nWhat's your experience with AI in development? 🤔\n\n#MachineLearning #CodeGeneration #DevTools #Innovation",
      image: "/placeholder.svg?height=400&width=600",
      theme: "AI & Coding",
    },
  ],
  financial: [
    {
      id: "4",
      content:
        "📈 Market volatility is creating unprecedented opportunities for those who know where to look.\n\nAfter analyzing the latest market trends, I've identified 3 key sectors showing remarkable resilience:\n\n🎯 Sectors to watch:\n• Technology infrastructure\n• Renewable energy\n• Healthcare innovation\n\nThe key is not to fear volatility, but to understand it. Smart money moves when others hesitate.\n\nWhat sectors are you keeping an eye on? Share your thoughts! 💭\n\n#FinancialMarkets #Investing #MarketAnalysis #Trading #WealthBuilding",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Financial Markets",
    },
    {
      id: "5",
      content:
        "🚨 Breaking: Central bank decisions are reshaping global markets!\n\nThe recent policy changes are creating ripple effects across:\n• Currency markets\n• Bond yields\n• Equity valuations\n• Commodity prices\n\n💡 Key takeaway: Diversification isn't just recommended - it's essential in today's interconnected global economy.\n\nSuccessful traders adapt their strategies based on macroeconomic shifts, not just technical indicators.\n\nHow are you adjusting your portfolio strategy? 🤔\n\n#CentralBank #GlobalMarkets #EconomicPolicy #RiskManagement",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Financial Markets",
    },
    {
      id: "6",
      content:
        "⚡ The financial markets are sending mixed signals, but here's what the data really shows...\n\nAfter deep-diving into market fundamentals, I've uncovered some fascinating patterns:\n\n📊 Key insights:\n• Institutional money is rotating sectors\n• Retail sentiment vs. smart money divergence\n• Hidden opportunities in overlooked markets\n\nThe best opportunities often hide in plain sight. While everyone's watching the headlines, smart investors are watching the data.\n\nRemember: Markets reward patience and punish emotion.\n\nWhat's your take on current market conditions? 💬\n\n#MarketInsights #DataDriven #InvestmentStrategy #FinancialAnalysis",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Financial Markets",
    },
  ],
  investing: [
    {
      id: "7",
      content:
        "💰 The biggest investing mistake I see people make? Trying to time the market instead of time in the market.\n\nAfter 10+ years in investing, here's what I've learned:\n\n🎯 Winning strategies:\n• Dollar-cost averaging beats timing\n• Compound interest is your best friend\n• Diversification reduces risk without sacrificing returns\n• Patience trumps perfection\n\nThe wealthy don't have a crystal ball - they have discipline and a long-term perspective.\n\nWhat's the best investing advice you've ever received? Share below! 👇\n\n#Investing #WealthBuilding #PersonalFinance #LongTermInvesting #CompoundInterest",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Investing",
    },
    {
      id: "8",
      content:
        "🔍 Hidden gem alert: While everyone's chasing the latest trends, I've been quietly building positions in undervalued sectors.\n\nMy investment thesis:\n• Strong fundamentals\n• Recession-resistant business models\n• Growing market demand\n• Reasonable valuations\n\n💡 Remember: The best investments often feel uncomfortable at first. When others are fearful, be greedy (but smart about it).\n\nContrarian investing isn't about being different - it's about being right when it matters most.\n\nWhat undervalued opportunities are you seeing? 🤔\n\n#ValueInvesting #ContrarianInvesting #StockPicking #InvestmentOpportunity",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Investing",
    },
    {
      id: "9",
      content:
        "🚀 Portfolio update: My investment strategy is paying off, and here's why...\n\nKey principles I follow:\n\n📈 The 4 pillars of my approach:\n1. Research before you invest\n2. Diversify across asset classes\n3. Rebalance regularly\n4. Stay disciplined during volatility\n\nResults speak louder than predictions. While others panic during market downturns, disciplined investors see opportunities.\n\n💪 Building wealth isn't about getting rich quick - it's about getting rich slowly and surely.\n\nWhat's your investment philosophy? Let's discuss! 💬\n\n#PortfolioManagement #InvestmentPhilosophy #WealthCreation #FinancialFreedom",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Investing",
    },
  ],
}

const userProfile = {
  name: "Desi Reddy",
  level: 7,
  totalPosts: 42,
  avatar: "/placeholder.svg?height=80&width=80&text=%F0%9F%8C%9F",
}

const getLevelInfo = (level: number) => {
  if (level >= 10)
    return {
      title: "LinkedIn Legend",
      icon: Crown,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 border-yellow-200",
    }
  if (level >= 7)
    return { title: "Super Creator", icon: Star, color: "text-purple-500", bgColor: "bg-purple-50 border-purple-200" }
  if (level >= 4)
    return { title: "Content Master", icon: Zap, color: "text-blue-500", bgColor: "bg-blue-50 border-blue-200" }
  if (level >= 2)
    return { title: "Rising Star", icon: Star, color: "text-green-500", bgColor: "bg-green-50 border-green-200" }
  return { title: "Getting Started", icon: Zap, color: "text-gray-500", bgColor: "bg-gray-50 border-gray-200" }
}

export default function LinkedInPostGenerator() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [youtubeLink, setYoutubeLink] = useState("")
  const [keyword, setKeyword] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingPost, setEditingPost] = useState<GeneratedPost | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
    }
  }

  const generatePosts = async () => {
    if (!keyword || !selectedTheme) return

    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const posts = mockPosts[selectedTheme as keyof typeof mockPosts] || mockPosts["ai-coding"]
    setGeneratedPosts(posts)
    setIsGenerating(false)
  }

  const regeneratePosts = async () => {
    await generatePosts()
  }

  const handleEditPost = (post: GeneratedPost) => {
    setEditingPost(post)
    setEditedContent(post.content)
    setIsEditDialogOpen(true)
  }

  const saveEditedPost = () => {
    if (editingPost) {
      const updatedPosts = generatedPosts.map((post) =>
        post.id === editingPost.id ? { ...post, content: editedContent } : post,
      )
      setGeneratedPosts(updatedPosts)
      setIsEditDialogOpen(false)
      setEditingPost(null)
    }
  }

  const handlePostToLinkedIn = (post: GeneratedPost) => {
    // Create LinkedIn share URL with the post content
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href,
    )}&summary=${encodeURIComponent(post.content)}`

    // Open LinkedIn in a new tab
    window.open(linkedInUrl, "_blank", "noopener,noreferrer")
  }

  const getThemeColor = (themeName: string) => {
    const theme = themes.find((t) => t.label === themeName)
    return theme?.color || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Combined User Profile and Header Section */}
        <Card className="mb-4 sm:mb-6 overflow-hidden border-2 border-gradient-to-r from-purple-200 to-pink-200">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              {/* User Profile - Top on mobile, Left on desktop */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <img
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt={userProfile.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                    {(() => {
                      const levelInfo = getLevelInfo(userProfile.level)
                      const IconComponent = levelInfo.icon
                      return <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 ${levelInfo.color}`} />
                    })()}
                  </div>
                </div>
                <div className="text-white">
                  <h2 className="text-xl sm:text-3xl font-bold">{userProfile.name}</h2>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <Badge
                      className={`${getLevelInfo(userProfile.level).bgColor} ${getLevelInfo(userProfile.level).color} border text-xs sm:text-sm px-2 py-1 sm:px-3`}
                    >
                      Level {userProfile.level} • {getLevelInfo(userProfile.level).title}
                    </Badge>
                  </div>
                  <p className="text-purple-100 text-sm sm:text-base mt-1 sm:mt-2">
                    {userProfile.totalPosts} posts created
                  </p>
                </div>
              </div>

              {/* Header Content - Bottom on mobile, Right on desktop */}
              <div className="text-center sm:text-right">
                <h1 className="text-3xl sm:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
                  LinkedIn Post Generator
                </h1>
                <p className="text-purple-100 text-base sm:text-xl">Create engaging LinkedIn posts with AI magic! 🚀</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Theme Selection Tabs */}
        <Card className="mb-4 sm:mb-6 border-2 border-purple-200 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-purple-700 font-bold text-base sm:text-lg">Select Your Theme 🎨</Label>
              <Tabs value={selectedTheme} onValueChange={setSelectedTheme} className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-2 h-auto">
                  <TabsTrigger
                    value="ai-coding"
                    className="rounded-lg font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    🤖 AI & Coding
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className="rounded-lg font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    💰 Financial Markets
                  </TabsTrigger>
                  <TabsTrigger
                    value="investing"
                    className="rounded-lg font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    📈 Investing
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-purple-800 text-lg sm:text-xl font-bold">Generate Your Amazing Posts</CardTitle>
            <CardDescription className="text-purple-600 text-sm sm:text-base">
              Upload content, enter keywords, and generate stunning LinkedIn posts! 🎯
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="pdf-upload"
                  className="flex items-center gap-2 text-purple-700 font-medium text-sm sm:text-base"
                >
                  <FileText className="h-4 w-4" />
                  Upload PDF 📄
                </Label>
                <div className="border-3 border-dashed border-purple-300 rounded-xl p-4 sm:p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 bg-gradient-to-br from-purple-25 to-pink-25">
                  <input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 sm:mb-3 text-purple-400" />
                    <p className="text-xs sm:text-sm text-purple-600 font-medium">
                      {pdfFile ? `📎 ${pdfFile.name}` : "Click to upload PDF file"}
                    </p>
                  </label>
                </div>
              </div>

              {/* YouTube Link */}
              <div className="space-y-2">
                <Label
                  htmlFor="youtube-link"
                  className="flex items-center gap-2 text-red-700 font-medium text-sm sm:text-base"
                >
                  <Youtube className="h-4 w-4 text-red-600" />
                  YouTube Video Link 🎥
                </Label>
                <Input
                  id="youtube-link"
                  type="url"
                  placeholder="https://youtube.com/watch?v=... ✨"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="border-2 border-red-200 focus:border-red-400 rounded-xl text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Keyword Input */}
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-indigo-700 font-medium text-sm sm:text-base">
                Keyword Magic
              </Label>
              <Input
                id="keyword"
                placeholder="Enter a keyword to generate amazing posts about..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border-2 border-indigo-200 focus:border-indigo-400 rounded-xl text-base sm:text-lg p-3 sm:p-4"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePosts}
              disabled={!keyword || !selectedTheme || isGenerating}
              className={`w-full ${
                generatedPosts.length > 0
                  ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800"
                  : "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600"
              } text-white font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                  Creating Magic...
                </>
              ) : generatedPosts.length > 0 ? (
                <>
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Regenerate Magic Posts!
                </>
              ) : (
                <>Generate Amazing Posts!</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Posts Section */}
        {generatedPosts.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Generated Posts
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {generatedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getThemeColor(post.theme)} font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-lg`}
                    >
                      {post.theme} {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </Badge>
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-bold text-purple-600">Post #{index + 1}</span>
                    </div>
                  </div>
                  <CardContent className="p-3 sm:p-5">
                    <div className="space-y-3 sm:space-y-4">
                      <div
                        className="text-xs sm:text-sm text-gray-700 max-h-64 sm:max-h-96 overflow-y-auto pr-2"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "#a855f7 #f3e8ff",
                        }}
                      >
                        {post.content.split("\n").map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-2 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                        <Button
                          onClick={() => handlePostToLinkedIn(post)}
                          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-500 text-xs sm:text-sm"
                          size="sm"
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />📱 LinkedIn Post
                        </Button>
                        <Button
                          onClick={() => handleEditPost(post)}
                          variant="outline"
                          size="sm"
                          className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-xl font-medium text-xs sm:text-sm"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          ✏️ Edit Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto border-2 border-purple-200 mx-2 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-purple-800">
                ✏️ Edit Your LinkedIn Post
              </DialogTitle>
              <DialogDescription className="text-purple-600 text-sm sm:text-base">
                Make your post even more amazing!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4">
              {editingPost && (
                <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-purple-200">
                  <img
                    src={editingPost.image || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getThemeColor(editingPost.theme)} font-medium shadow-lg text-xs sm:text-sm`}
                  >
                    {editingPost.theme}
                  </Badge>
                </div>
              )}
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={8}
                placeholder="Edit your amazing post content..."
                className="resize-none border-2 border-purple-200 focus:border-purple-400 rounded-xl text-sm sm:text-base"
              />
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-2 border-gray-300 rounded-xl text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={saveEditedPost}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-sm sm:text-base"
              >
                💾 Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
