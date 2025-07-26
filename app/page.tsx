"use client"

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
import { Edit, RefreshCw, ExternalLink, Calendar, Clock, Trash2, Eye } from "lucide-react"
import { Crown, Star, Zap } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GeneratedPost {
  id: string
  content: string
  image: string
  theme: string
}

interface ScheduledPost {
  id: string
  content: string
  image: string
  theme: string
  scheduledDate: string
  scheduledTime: string
  originalPostId: string
}

const themes = [
  { value: "ai-coding", label: "AI & Coding", color: "bg-purple-100 text-purple-800" },
  { value: "financial", label: "Financial Markets", color: "bg-orange-100 text-orange-800" },
]

const topicSuggestions = {
  "ai-coding": [
    "Machine Learning",
    "ChatGPT",
    "Code Review",
    "Python Programming",
    "AI Tools",
    "Software Development",
    "Automation",
    "Deep Learning",
    "Neural Networks",
    "API Development",
    "Cloud Computing",
    "DevOps",
  ],
  financial: [
    "Stock Market",
    "Cryptocurrency",
    "Investment Strategy",
    "Portfolio Management",
    "Risk Management",
    "Market Analysis",
    "Trading Tips",
    "Economic Trends",
    "Financial Planning",
    "Wealth Building",
    "Market Volatility",
    "Interest Rates",
  ],
}

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
}

const userProfile = {
  name: "Desi Reddy",
  level: 7,
  totalPosts: 42,
  avatar: "/placeholder.svg?height=80&width=80&text=%F0%9F%8F%85", // Changed from %F0%9F%8C%9F to %F0%9F%8F%85
}

const getLevelInfo = (level: number) => {
  if (level >= 10)
    return {
      title: "LinkedIn Legend",
      icon: Crown,
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-300",
    }
  if (level >= 7)
    return { title: "Super Creator", icon: Star, color: "text-purple-600", bgColor: "bg-purple-50 border-purple-300" }
  if (level >= 4)
    return { title: "Content Master", icon: Zap, color: "text-orange-600", bgColor: "bg-orange-50 border-orange-300" }
  if (level >= 2)
    return { title: "Rising Star", icon: Star, color: "text-purple-600", bgColor: "bg-purple-50 border-purple-300" }
  return { title: "Getting Started", icon: Zap, color: "text-gray-500", bgColor: "bg-gray-50 border-gray-200" }
}

export default function LinkedInPostGenerator() {
  const [keyword, setKeyword] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([])
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingPost, setEditingPost] = useState<GeneratedPost | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [schedulingPost, setSchedulingPost] = useState<GeneratedPost | null>(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [showScheduledPosts, setShowScheduledPosts] = useState(false)

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

  const handleSchedulePost = (post: GeneratedPost) => {
    setSchedulingPost(post)
    setScheduleDate("")
    setScheduleTime("")
    setIsScheduleDialogOpen(true)
  }

  const saveScheduledPost = () => {
    if (schedulingPost && scheduleDate && scheduleTime) {
      const newScheduledPost: ScheduledPost = {
        id: `scheduled-${Date.now()}`,
        content: schedulingPost.content,
        image: schedulingPost.image,
        theme: schedulingPost.theme,
        scheduledDate: scheduleDate, // Declared variable
        scheduledTime: scheduleTime, // Declared variable
        originalPostId: schedulingPost.id,
      }
      setScheduledPosts([...scheduledPosts, newScheduledPost])
      setIsScheduleDialogOpen(false)
      setSchedulingPost(null)
    }
  }

  const deleteScheduledPost = (scheduledPostId: string) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== scheduledPostId))
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

  const handleTopicSuggestionClick = (topic: string) => {
    setKeyword(topic)
  }

  const getCurrentSuggestions = () => {
    return selectedTheme ? topicSuggestions[selectedTheme as keyof typeof topicSuggestions] || [] : []
  }

  const formatScheduledDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`)
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-orange-50-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Combined User Profile and Header Section */}
        <Card className="mb-4 sm:mb-6 overflow-hidden border-2 border-purple-300">
          <div className="bg-gradient-to-r from-purple-400 via-orange-300 to-purple-400 p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
              {/* User Profile - Top on mobile, Left on desktop */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-7xl sm:text-8xl">🏅</div>
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
                    {userProfile.totalPosts} posts created • {scheduledPosts.length} scheduled
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

        {/* Scheduled Posts Toggle */}
        {scheduledPosts.length > 0 && (
          <Card className="mb-4 sm:mb-6 border-2 border-orange-300 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="font-bold text-orange-700 text-base sm:text-lg">
                    📅 {scheduledPosts.length} Scheduled Post{scheduledPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <Button
                  onClick={() => setShowScheduledPosts(!showScheduledPosts)}
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showScheduledPosts ? "Hide" : "View"} Scheduled
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scheduled Posts Section */}
        {showScheduledPosts && scheduledPosts.length > 0 && (
          <Card className="mb-6 border-2 border-orange-300 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-orange-50">
              <CardTitle className="text-purple-800 text-lg sm:text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Scheduled Posts
              </CardTitle>
              <CardDescription className="text-orange-600">Manage your upcoming LinkedIn posts</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {scheduledPosts.map((scheduledPost) => (
                  <div
                    key={scheduledPost.id}
                    className="border-2 border-orange-100 rounded-xl p-4 bg-gradient-to-r from-orange-25 to-yellow-25 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={scheduledPost.image || "/placeholder.svg"}
                          alt="Scheduled post"
                          className="w-full sm:w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <Badge className={`${getThemeColor(scheduledPost.theme)} w-fit`}>{scheduledPost.theme}</Badge>
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">
                              {formatScheduledDateTime(scheduledPost.scheduledDate, scheduledPost.scheduledTime)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {scheduledPost.content.substring(0, 150)}...
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => deleteScheduledPost(scheduledPost.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Theme Selection Tabs */}
        <Card className="mb-4 sm:mb-6 border-2 border-purple-300 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-purple-700 font-bold text-base sm:text-lg">Select Your Theme 🎨</Label>
              <Tabs value={selectedTheme} onValueChange={setSelectedTheme} className="w-full">
                <TabsList className="grid w-full grid-cols-2 gap-2 sm:gap-0 bg-gradient-to-r from-purple-25 to-orange-25 border-2 border-purple-300 rounded-xl p-2 h-auto">
                  <TabsTrigger
                    value="ai-coding"
                    className="rounded-lg font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    🤖 AI & Coding
                  </TabsTrigger>
                  <TabsTrigger
                    value="financial"
                    className="rounded-lg font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    💰 Financial Markets
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Topic Suggestions */}
              {selectedTheme && (
                <div className="space-y-3 animate-in fade-in-50 duration-500">
                  <Label className="text-indigo-700 font-medium text-sm sm:text-base">
                    💡 Popular Topics (Click to select)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {getCurrentSuggestions().map((topic, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleTopicSuggestionClick(topic)}
                        className={`rounded-full text-xs sm:text-sm px-3 py-1 transition-all duration-300 hover:scale-105 ${
                          keyword === topic
                            ? selectedTheme === "ai-coding"
                              ? "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200"
                              : "bg-orange-100 border-orange-400 text-orange-800 hover:bg-orange-200"
                            : selectedTheme === "ai-coding"
                              ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                              : "border-orange-300 text-orange-700 hover:bg-orange-50"
                        }`}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-purple-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-orange-50">
            <CardTitle className="text-purple-800 text-lg sm:text-xl font-bold">Generate Your Amazing Posts</CardTitle>
            <CardDescription className="text-purple-600 text-sm sm:text-base">
              Enter a topic to generate stunning LinkedIn posts! 🎯
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Keyword Input */}
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-indigo-700 font-medium text-sm sm:text-base">
                Topic Magic
              </Label>
              <Input
                id="keyword"
                placeholder="Enter a topic to generate amazing posts!"
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
                  ? "bg-gradient-to-r from-purple-300 via-orange-200 to-purple-300 hover:from-purple-400 hover:via-orange-300 hover:to-purple-400"
                  : "bg-gradient-to-r from-purple-300 via-orange-200 to-purple-300 hover:from-purple-400 hover:via-orange-300 hover:to-purple-400"
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
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-orange-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                Your Generated Posts
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {generatedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-300 hover:border-purple-400"
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
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          onClick={() => handlePostToLinkedIn(post)}
                          className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                          size="sm"
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />📱 Post to LinkedIn
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => handleSchedulePost(post)}
                            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                            size="sm"
                          >
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />📅 Schedule
                          </Button>
                          <Button
                            onClick={() => handleEditPost(post)}
                            variant="outline"
                            size="sm"
                            className="border-purple-400 text-purple-700 hover:bg-purple-50 rounded-xl font-medium text-xs sm:text-sm"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            ✏️ Edit
                          </Button>
                        </div>
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
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto border-2 border-purple-300 mx-2 sm:mx-auto">
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
                <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-purple-300">
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

        {/* Schedule Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto border-2 border-orange-300 mx-2 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-orange-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />📅 Schedule Your LinkedIn Post
              </DialogTitle>
              <DialogDescription className="text-orange-600 text-sm sm:text-base">
                Choose when you want this post to be published
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              {schedulingPost && (
                <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-orange-300">
                  <img
                    src={schedulingPost.image || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getThemeColor(schedulingPost.theme)} font-medium shadow-lg text-xs sm:text-sm`}
                  >
                    {schedulingPost.theme}
                  </Badge>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date" className="text-orange-700 font-medium">
                    📅 Date
                  </Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={getTodayDate()}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time" className="text-orange-700 font-medium">
                    🕐 Time
                  </Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl"
                  />
                </div>
              </div>

              {scheduleDate && scheduleTime && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">
                      Scheduled for: {formatScheduledDateTime(scheduleDate, scheduleTime)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsScheduleDialogOpen(false)}
                className="border-2 border-gray-300 rounded-xl text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={saveScheduledPost}
                disabled={!scheduleDate || !scheduleTime}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-xl text-sm sm:text-base"
              >
                📅 Schedule Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
