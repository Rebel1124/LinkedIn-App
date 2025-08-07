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
import { Edit, RefreshCw, ExternalLink, Calendar, Clock, Trash2, Eye } from 'lucide-react'
import { Crown, Star, Zap } from 'lucide-react'
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
  { value: "economics", label: "Economics", color: "bg-blue-100 text-blue-800", emoji: "📊" },
  { value: "markets", label: "Markets", color: "bg-green-100 text-green-800", emoji: "📈" },
  { value: "python", label: "Python", color: "bg-yellow-100 text-yellow-800", emoji: "🐍" },
  { value: "risk", label: "Risk", color: "bg-red-100 text-red-800", emoji: "⚠️" },
  { value: "statistics", label: "Statistics", color: "bg-purple-100 text-purple-800", emoji: "📉" },
  { value: "trading", label: "Trading", color: "bg-yellow-100 text-yellow-800", emoji: "💹" },
]

const topicSuggestions = {
  economics: [
    "Inflation Trends",
    "GDP Growth",
    "Monetary Policy",
    "Economic Indicators",
    "Supply & Demand",
    "Market Cycles",
    "Interest Rates",
    "Economic Forecasting",
    "Fiscal Policy",
    "Labor Markets",
    "Global Economics",
    "Economic Theory",
  ],
  markets: [
    "Stock Market",
    "Bond Markets",
    "Commodity Trading",
    "Market Volatility",
    "Bull vs Bear Markets",
    "Market Analysis",
    "Sector Rotation",
    "Market Sentiment",
    "IPO Markets",
    "Emerging Markets",
    "Market Trends",
    "Market Psychology",
  ],
  python: [
    "Data Analysis",
    "Machine Learning",
    "Pandas Library",
    "NumPy Arrays",
    "Python Automation",
    "Web Scraping",
    "API Development",
    "Data Visualization",
    "Financial Modeling",
    "Algorithmic Trading",
    "Python Libraries",
    "Code Optimization",
  ],
  risk: [
    "Risk Management",
    "Portfolio Risk",
    "Market Risk",
    "Credit Risk",
    "Operational Risk",
    "Risk Assessment",
    "VaR Models",
    "Risk Mitigation",
    "Stress Testing",
    "Risk Metrics",
    "Hedging Strategies",
    "Risk Analytics",
  ],
  statistics: [
    "Statistical Analysis",
    "Probability Theory",
    "Regression Analysis",
    "Hypothesis Testing",
    "Data Distribution",
    "Correlation Analysis",
    "Statistical Models",
    "Bayesian Statistics",
    "Time Series Analysis",
    "Statistical Inference",
    "Data Mining",
    "Predictive Analytics",
  ],
  trading: [
    "Day Trading",
    "Swing Trading",
    "Technical Analysis",
    "Trading Strategies",
    "Options Trading",
    "Forex Trading",
    "Trading Psychology",
    "Risk-Reward Ratio",
    "Chart Patterns",
    "Trading Indicators",
    "Portfolio Management",
    "Trading Algorithms",
  ],
}

const trendingHeadlines = {
  economics: [
    "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
    "Global Supply Chain Disruptions Continue to Impact Inflation Rates",
    "Labor Market Shows Signs of Cooling as Job Openings Decline",
    "Central Banks Worldwide Coordinate Response to Currency Volatility",
    "Consumer Spending Patterns Shift as Economic Outlook Remains Mixed"
  ],
  markets: [
    "Tech Stocks Rally as AI Investment Surge Continues",
    "Bond Yields Fluctuate Amid Mixed Economic Signals",
    "Emerging Markets See Capital Inflows Despite Global Uncertainty",
    "Cryptocurrency Market Volatility Reaches New Heights",
    "Energy Sector Leads Market Gains on Supply Concerns"
  ],
  python: [
    "Python 3.12 Released with Enhanced Performance Features",
    "Machine Learning Libraries See Major Updates for 2024",
    "Financial Institutions Adopt Python for Risk Management Systems",
    "Open Source Python Tools Revolutionize Data Analysis",
    "Python Developers Report Highest Salary Growth in Tech"
  ],
  risk: [
    "Cybersecurity Threats Pose Growing Risk to Financial Institutions",
    "Climate Risk Assessment Becomes Mandatory for Major Banks",
    "Operational Risk Management Gets AI-Powered Upgrade",
    "Regulatory Changes Increase Compliance Risk for Fintech",
    "Geopolitical Tensions Create New Risk Management Challenges"
  ],
  statistics: [
    "Big Data Analytics Transform Statistical Modeling Approaches",
    "Bayesian Methods Gain Popularity in Financial Forecasting",
    "Statistical Software Market Sees Record Growth in 2024",
    "Academic Research Highlights Bias in Traditional Statistical Models",
    "Real-Time Statistical Analysis Becomes Standard in Trading"
  ],
  trading: [
    "Algorithmic Trading Accounts for 80% of Market Volume",
    "Retail Trading Platforms Report Record User Growth",
    "High-Frequency Trading Faces New Regulatory Scrutiny",
    "Options Trading Volume Hits All-Time High",
    "Social Trading Platforms Gain Institutional Interest"
  ]
}

const mockPosts = {
  economics: [
    {
      id: "econ1",
      content: "📊 The latest economic indicators are painting an interesting picture of where we're headed.\n\nKey observations from this week's data:\n• Inflation showing signs of moderation\n• Employment numbers remain robust\n• Consumer spending patterns shifting\n\n💡 What this means for investors:\nDiversification across asset classes becomes even more critical as we navigate these economic crosscurrents.\n\nThe interplay between monetary policy and market dynamics will be fascinating to watch in the coming quarters.\n\nWhat economic indicators are you watching most closely? 📈\n\n#Economics #MonetaryPolicy #MarketAnalysis #Investing",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Economics",
    },
    {
      id: "econ2",
      content: "🌍 Global economic interdependence has never been more apparent than it is today.\n\nRecent developments highlight how:\n• Supply chain disruptions ripple across continents\n• Currency fluctuations impact international trade\n• Central bank policies create global spillover effects\n\n🎯 Key takeaway: Understanding macroeconomic trends isn't just academic—it's essential for making informed financial decisions.\n\nThe most successful investors and businesses are those who can read these economic tea leaves and position themselves accordingly.\n\nHow do you factor global economic trends into your decision-making? 🤔\n\n#GlobalEconomics #MacroTrends #InvestmentStrategy #EconomicPolicy",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Economics",
    },
    {
      id: "econ3",
      content: "⚡ Economic cycles are like seasons—predictable in their occurrence, unpredictable in their timing.\n\nCurrently observing:\n• Late-cycle indicators flashing mixed signals\n• Yield curve dynamics suggesting caution\n• Consumer confidence vs. actual spending divergence\n\n📈 Historical perspective: Every economic expansion eventually faces headwinds, but the duration and severity vary dramatically.\n\nSmart money prepares for multiple scenarios rather than betting on a single outcome.\n\nWhat's your strategy for navigating economic uncertainty? 💭\n\n#EconomicCycles #MarketTiming #RiskManagement #EconomicForecasting",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Economics",
    },
  ],
  markets: [
    {
      id: "market1",
      content: "📈 Market volatility isn't noise—it's information.\n\nThis week's market action reveals:\n• Sector rotation accelerating\n• Growth vs. value dynamics shifting\n• International markets showing divergence\n\n🎯 Key insight: Volatility creates opportunities for those who understand what the market is really saying.\n\nWhile others see chaos, experienced investors see:\n• Mispriced assets\n• Sentiment extremes\n• Structural shifts in market dynamics\n\nThe question isn't whether markets will be volatile—it's how you'll respond when they are.\n\nHow do you turn market volatility into opportunity? 💡\n\n#Markets #Volatility #InvestmentOpportunity #MarketAnalysis",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Markets",
    },
    {
      id: "market2",
      content: "🚀 The bond market is sending signals that equity investors can't afford to ignore.\n\nCurrent observations:\n• Yield curve steepening/flattening patterns\n• Credit spreads widening in specific sectors\n• International bond flows shifting dramatically\n\n💡 Why this matters: Bond markets often lead equity markets in signaling economic transitions.\n\nSmart investors use fixed income markets as a crystal ball for:\n• Economic growth expectations\n• Inflation trajectory\n• Central bank policy shifts\n\nThe bond market doesn't lie—it just speaks a different language.\n\nWhat are the bond markets telling you right now? 📊\n\n#BondMarkets #YieldCurve #MarketSignals #FixedIncome",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Markets",
    },
    {
      id: "market3",
      content: "🌟 Market sentiment is a powerful force, but it's not always rational.\n\nRecent sentiment indicators show:\n• Fear/Greed index at extreme levels\n• Options positioning suggesting complacency\n• Retail vs. institutional sentiment diverging\n\n⚡ Contrarian insight: The best opportunities often emerge when sentiment reaches extremes.\n\nWhen everyone is bullish, who's left to buy?\nWhen everyone is bearish, who's left to sell?\n\nSuccessful investing requires thinking independently while respecting market psychology.\n\nHow do you balance sentiment analysis with fundamental research? 🤔\n\n#MarketSentiment #ContrarianInvesting #MarketPsychology #InvestmentStrategy",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Markets",
    },
  ],
  python: [
    {
      id: "python1",
      content: "🐍 Python is revolutionizing how we analyze financial data.\n\nJust built a portfolio optimization script that:\n• Calculates efficient frontier in real-time\n• Incorporates transaction costs\n• Handles multiple asset classes\n• Runs Monte Carlo simulations\n\n💡 Key libraries making this possible:\n• Pandas for data manipulation\n• NumPy for numerical computing\n• SciPy for optimization\n• Matplotlib for visualization\n\nThe democratization of quantitative finance through Python is incredible. What used to require expensive software is now accessible to anyone willing to learn.\n\nWhat's your favorite Python library for financial analysis? 📊\n\n#Python #QuantitativeFinance #DataScience #FinTech #Programming",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Python",
    },
    {
      id: "python2",
      content: "⚡ Automated trading with Python: From concept to execution in 100 lines of code.\n\nToday's project breakdown:\n• Real-time data ingestion via APIs\n• Technical indicator calculations\n• Signal generation and backtesting\n• Risk management integration\n\n🎯 Python advantages for trading:\n• Rapid prototyping\n• Extensive library ecosystem\n• Easy integration with brokers\n• Powerful data analysis capabilities\n\nThe barrier to entry for algorithmic trading has never been lower. Python makes complex strategies accessible to individual traders.\n\nWhat trading strategies are you automating with Python? 🤖\n\n#AlgorithmicTrading #Python #TradingBots #FinTech #Automation",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Python",
    },
    {
      id: "python3",
      content: "📈 Data visualization in Python: Making complex financial data tell a story.\n\nLatest dashboard features:\n• Interactive correlation heatmaps\n• Dynamic risk-return scatter plots\n• Time series decomposition charts\n• Portfolio performance attribution\n\n🔥 Visualization libraries I'm loving:\n• Plotly for interactivity\n• Seaborn for statistical plots\n• Bokeh for web applications\n• Matplotlib for publication-quality charts\n\nGood data visualization doesn't just show information—it reveals insights that drive better decisions.\n\nWhat's your go-to Python visualization technique? 📊\n\n#DataVisualization #Python #FinancialAnalysis #DataScience #Analytics",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Python",
    },
  ],
  risk: [
    {
      id: "risk1",
      content: "⚠️ Risk management isn't about avoiding risk—it's about understanding and pricing it correctly.\n\nKey risk metrics I monitor daily:\n• Value at Risk (VaR) across portfolios\n• Maximum drawdown scenarios\n• Correlation breakdowns during stress\n• Tail risk exposures\n\n💡 Critical insight: The biggest risks are often the ones you're not measuring.\n\nBlack swan events remind us that:\n• Historical data has limitations\n• Correlations aren't stable\n• Liquidity can disappear instantly\n\nEffective risk management combines quantitative models with qualitative judgment.\n\nWhat's your approach to measuring unmeasurable risks? 🤔\n\n#RiskManagement #VaR #TailRisk #PortfolioRisk #RiskAnalytics",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Risk",
    },
    {
      id: "risk2",
      content: "🎯 Stress testing portfolios: Preparing for what hasn't happened yet.\n\nRecent stress test scenarios:\n• 2008-style credit crisis\n• 1970s inflation shock\n• Technology bubble burst\n• Geopolitical risk events\n\n⚡ Key findings: Diversification works until it doesn't.\n\nDuring extreme stress:\n• Correlations approach 1.0\n• Liquidity premiums spike\n• Safe havens may not be safe\n• Behavioral factors dominate\n\nThe goal isn't to predict the future—it's to survive whatever future arrives.\n\nHow do you stress test your investment strategy? 📊\n\n#StressTesting #RiskManagement #PortfolioResilience #CrisisPreparedness",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Risk",
    },
    {
      id: "risk3",
      content: "🔍 Operational risk: The hidden threat that can destroy even the best investment strategies.\n\nCommon operational risks:\n• Technology failures\n• Human error in execution\n• Regulatory compliance gaps\n• Counterparty failures\n\n💡 Risk mitigation strategies:\n• Robust backup systems\n• Clear procedures and controls\n• Regular audits and reviews\n• Diversified counterparty exposure\n\nYou can have the perfect investment thesis, but operational failures can wipe out years of gains in minutes.\n\nWhat operational risks keep you up at night? ⚠️\n\n#OperationalRisk #RiskManagement #SystemsRisk #ComplianceRisk #RiskMitigation",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Risk",
    },
  ],
  statistics: [
    {
      id: "stats1",
      content: "📉 Statistical significance vs. economic significance: A critical distinction every analyst should understand.\n\nRecent analysis revealed:\n• Statistically significant correlation (p < 0.05)\n• But economically meaningless relationship\n• Large sample size creating false confidence\n\n🎯 Key lesson: Statistical tools are powerful, but they need economic context.\n\nCommon statistical pitfalls in finance:\n• Confusing correlation with causation\n• Ignoring regime changes\n• Over-fitting historical data\n• Survivorship bias in datasets\n\nGood statistics inform decisions; great statistics prevent bad ones.\n\nWhat statistical concepts do you think are most misunderstood in finance? 📊\n\n#Statistics #DataAnalysis #StatisticalSignificance #QuantitativeAnalysis #DataScience",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Statistics",
    },
    {
      id: "stats2",
      content: "⚡ Bayesian thinking in investment analysis: Updating beliefs with new evidence.\n\nPractical applications:\n• Prior beliefs about market direction\n• New data updates probability estimates\n• Continuous refinement of investment thesis\n• Incorporating uncertainty into decisions\n\n💡 Bayesian advantages:\n• Explicit treatment of uncertainty\n• Natural framework for learning\n• Incorporates prior knowledge\n• Provides probability distributions, not point estimates\n\nInvestment success often comes from being less wrong, not perfectly right.\n\nHow do you update your investment views when new information arrives? 🤔\n\n#BayesianStatistics #ProbabilisticThinking #InvestmentAnalysis #DecisionMaking #Statistics",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Statistics",
    },
    {
      id: "stats3",
      content: "📈 Time series analysis: Extracting signal from noise in financial data.\n\nCurrent research focus:\n• Trend decomposition methods\n• Seasonality patterns in returns\n• Volatility clustering effects\n• Regime change detection\n\n🔍 Key insights from recent analysis:\n• Markets exhibit long memory in volatility\n• Return predictability varies by time horizon\n• Structural breaks are more common than assumed\n\nTime series analysis reveals that financial markets are neither purely random nor perfectly predictable—they're something more interesting.\n\nWhat time series patterns have you discovered in your analysis? 📊\n\n#TimeSeriesAnalysis #FinancialEconometrics #MarketMicrostructure #Statistics #DataAnalysis",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Statistics",
    },
  ],
  trading: [
    {
      id: "trading1",
      content: "💹 Trading psychology: The difference between knowing what to do and actually doing it.\n\nCommon psychological traps:\n• Loss aversion leading to poor exits\n• Confirmation bias in analysis\n• Overconfidence after winning streaks\n• Fear of missing out driving bad entries\n\n🎯 Mental frameworks that help:\n• Pre-defined risk management rules\n• Systematic position sizing\n• Regular performance reviews\n• Emotional state awareness\n\nThe market doesn't care about your emotions, but your emotions will determine your market results.\n\nWhat's your biggest psychological challenge in trading? 🧠\n\n#TradingPsychology #BehavioralFinance #TradingMindset #RiskManagement #Trading",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Trading",
    },
    {
      id: "trading2",
      content: "📊 Technical analysis: Reading the market's body language.\n\nKey patterns I'm watching:\n• Support and resistance levels\n• Volume confirmation signals\n• Momentum divergences\n• Chart pattern completions\n\n⚡ Technical analysis insights:\n• Price action reflects all available information\n• Patterns repeat because human behavior repeats\n• Volume validates price movements\n• Multiple timeframe analysis provides context\n\nTechnical analysis isn't fortune telling—it's probability assessment based on market behavior patterns.\n\nWhat's your favorite technical indicator and why? 📈\n\n#TechnicalAnalysis #ChartPatterns #TradingStrategy #MarketAnalysis #Trading",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Trading",
    },
    {
      id: "trading3",
      content: "🎯 Position sizing: The most important trading decision you'll make.\n\nPosition sizing principles:\n• Risk per trade should be consistent\n• Account for volatility differences\n• Consider correlation between positions\n• Adjust for market conditions\n\n💡 Kelly Criterion insights:\n• Optimal position size depends on edge and odds\n• Over-betting can lead to ruin\n• Under-betting limits growth potential\n• Practical implementation requires modifications\n\nYou can be right about market direction 60% of the time and still lose money with poor position sizing.\n\nHow do you determine your position sizes? 📊\n\n#PositionSizing #RiskManagement #KellyCriterion #TradingStrategy #MoneyManagement",
      image: "/placeholder.svg?height=400&width=600",
      theme: "Trading",
    },
  ],
}

const userProfile = {
  name: "Desi Reddy",
  level: 7,
  totalPosts: 42,
  avatar: "/placeholder.svg?height=80&width=80&text=%F0%9F%8F%85",
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
    return { title: "Super Creator", icon: Star, color: "text-blue-600", bgColor: "bg-blue-50 border-blue-300" }
  if (level >= 4)
    return { title: "Content Master", icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-50 border-yellow-300" }
  if (level >= 2)
    return { title: "Rising Star", icon: Star, color: "text-blue-600", bgColor: "bg-blue-50 border-blue-300" }
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

    const posts = mockPosts[selectedTheme as keyof typeof mockPosts] || mockPosts["economics"]
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
        scheduledDate: scheduleDate,
        scheduledTime: scheduleTime,
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

  const getThemeEmoji = (themeName: string) => {
    const theme = themes.find((t) => t.label === themeName)
    return theme?.emoji || "📊"
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-yellow-50 p-2 sm:p-4">
      <div className="max-w-sm mx-auto space-y-3 sm:space-y-6">
        {/* Combined User Profile and Header Section */}
        <Card className="overflow-hidden border-2 border-yellow-400">
          <div className="bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-400 p-3 sm:p-8">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              {/* Header Content */}
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-1 sm:mb-4 drop-shadow-lg">
                  LinkedIn Post Generator
                </h1>
                <p className="text-white text-sm sm:text-xl">Create engaging LinkedIn posts with AI magic! 🚀</p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-white text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">{userProfile.name}</h2>
                    <div className="text-2xl sm:text-4xl md:text-5xl">🏅</div>
                  </div>
                  <p className="text-white text-xs sm:text-base mt-1">
                    Quantitative Investment Professional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scheduled Posts Toggle */}
        {scheduledPosts.length > 0 && (
          <Card className="border-2 border-yellow-400 shadow-lg">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700 text-sm sm:text-lg">
                    📅 {scheduledPosts.length} Scheduled Post{scheduledPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <Button
                  onClick={() => setShowScheduledPosts(!showScheduledPosts)}
                  variant="outline"
                  size="sm"
                  className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 w-full sm:w-auto"
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
          <Card className="border-2 border-yellow-400 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-yellow-50 p-3 sm:p-6">
              <CardTitle className="text-blue-800 text-base sm:text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Scheduled Posts
              </CardTitle>
              <CardDescription className="text-yellow-600 text-sm">Manage your upcoming LinkedIn posts</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {scheduledPosts.map((scheduledPost) => (
                  <div
                    key={scheduledPost.id}
                    className="border-2 border-yellow-400 rounded-xl p-3 sm:p-4 bg-gradient-to-r from-yellow-25 to-blue-25 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={scheduledPost.image || "/placeholder.svg"}
                            alt="Scheduled post"
                            className="w-full sm:w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col gap-2">
                            <Badge className={`${getThemeColor(scheduledPost.theme)} w-fit text-xs`}>
                              {getThemeEmoji(scheduledPost.theme)} {scheduledPost.theme}
                            </Badge>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-yellow-600">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="font-medium">
                                {formatScheduledDateTime(scheduledPost.scheduledDate, scheduledPost.scheduledTime)}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                            {scheduledPost.content.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => deleteScheduledPost(scheduledPost.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 text-xs flex-1 sm:flex-none"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Theme Selection Tabs */}
        <Card className="border-2 border-blue-300 shadow-lg">
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-blue-800 font-bold text-sm sm:text-lg">Select Your Theme 🎨</Label>
              <Tabs value={selectedTheme} onValueChange={setSelectedTheme} className="w-full">
                <TabsList className="grid w-full grid-cols-3 grid-rows-2 gap-2 bg-gradient-to-br from-yellow-50 via-blue-50 to-yellow-50 border-2 border-yellow-400 rounded-xl p-3 h-auto">
                  {themes.map((theme) => (
                    <TabsTrigger
                      key={theme.value}
                      value={theme.value}
                      className="rounded-lg font-bold py-4 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-200 hover:to-yellow-300 hover:shadow-md flex flex-col items-center gap-1 min-h-[70px]"
                    >
                      <span className="text-lg sm:text-lg">{theme.emoji}</span>
                      <span className="text-xs leading-tight text-center">{theme.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Topic Suggestions */}
              {selectedTheme && (
                <div className="space-y-3 animate-in fade-in-50 duration-500">
                  <Label className="text-yellow-600 font-medium text-xs sm:text-base">
                    💡 Popular Topics (Click to select)
                  </Label>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {getCurrentSuggestions().slice(0, 8).map((topic, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleTopicSuggestionClick(topic)}
                        className={`rounded-full text-xs px-2 sm:px-3 py-1 transition-all duration-300 hover:scale-105 ${
                          keyword === topic
                            ? "bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200"
                            : "border-blue-300 text-blue-600 hover:bg-blue-200 hover:text-blue-600 hover:border-blue-300"
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

        {/* Trending Headlines Section */}
        {selectedTheme && (
          <Card className="border-2 border-blue-300 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-yellow-50 to-blue-50 p-3 sm:p-6">
              <CardTitle className="text-blue-800 text-base sm:text-xl font-bold flex items-center gap-2">
                Top 3 Trending Headlines
              </CardTitle>
              <CardDescription className="text-yellow-600 text-xs sm:text-base">
                Latest trending topics in {themes.find(t => t.value === selectedTheme)?.label} {themes.find(t => t.value === selectedTheme)?.emoji}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                {trendingHeadlines[selectedTheme as keyof typeof trendingHeadlines]?.slice(0, 3).map((headline, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-100 via-yellow-100 to-blue-100 border border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full border text-blue-700 border-blue-300 flex items-center justify-center">
                      <span className="font-bold text-xs sm:text-sm">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-base text-blue-800 font-medium leading-relaxed hover:text-yellow-700 transition-colors">
                        {headline}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge className="bg-white border border-yellow-400 text-yellow-700 text-xs px-1 sm:px-2 py-1">
                        🔥
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Section */}
        <Card className="border-2 border-blue-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-yellow-50 p-3 sm:p-6">
            <CardTitle className="text-blue-800 text-base sm:text-xl font-bold">Generate Your Amazing Posts</CardTitle>
            <CardDescription className="text-yellow-600 text-xs sm:text-base">
              Enter a topic to generate LinkedIn posts! 🎯
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-6 p-3 sm:p-6">
            {/* Keyword Input */}
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-blue-700 font-medium text-xs sm:text-base">
                Keyword Magic
              </Label>
              <Input
                id="keyword"
                placeholder="Enter a topic to generate amazing posts!"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm sm:text-lg p-3 sm:p-4 h-12 sm:h-auto"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePosts}
              disabled={!keyword || !selectedTheme || isGenerating}
              className={`w-full ${
                generatedPosts.length > 0
                  ? "bg-gradient-to-r from-blue-300 via-yellow-200 to-blue-300 hover:from-blue-400 hover:via-yellow-300 hover:to-blue-400 text-gray-500"
                  : "bg-gradient-to-r from-blue-300 via-yellow-200 to-blue-300 hover:from-blue-400 hover:via-yellow-300 hover:to-blue-400 text-gray-800"
              } text-gray-500 font-bold py-4 sm:py-4 rounded-xl text-sm sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px]`}
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
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg text-center">
                Your Generated Posts
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {generatedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400 hover:border-yellow-400"
                >
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className="absolute top-2 right-2 bg-white text-yellow-800 border border-yellow-400 text-xs px-2 py-1 rounded-full shadow-lg"
                    >
                      {getThemeEmoji(post.theme)} {post.theme} {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </Badge>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 border-2 border-blue-300">
                      <span className="text-xs font-bold text-blue-700">Post #{index + 1}</span>
                    </div>
                  </div>
                  <CardContent className="p-3 sm:p-5">
                    <div className="space-y-3">
                      <div
                        className="text-xs sm:text-sm text-gray-700 max-h-40 sm:max-h-64 overflow-y-auto pr-2"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "#eab308 #fef3c7",
                        }}
                      >
                        {post.content.split("\n").map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-2 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button
                          onClick={() => handleSchedulePost(post)}
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs h-10"
                          size="sm"
                        >
                          <Calendar className="h-3 w-3 mr-1" />📅 Schedule
                        </Button>
                        <Button
                          onClick={() => handleEditPost(post)}
                          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs h-10"
                          size="sm"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          ✏️ Edit
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
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-300 m-2">
            <DialogHeader className="p-4 sm:p-6">
              <DialogTitle className="text-lg sm:text-2xl font-bold text-blue-800">
                ✏️ Edit Your LinkedIn Post
              </DialogTitle>
              <DialogDescription className="text-blue-600 text-sm">
                Make your post even more amazing!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              {editingPost && (
                <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-blue-300">
                  <img
                    src={editingPost.image || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className="absolute top-2 right-2 bg-blue-100 text-blue-800 font-medium shadow-lg text-xs"
                  >
                    {getThemeEmoji(editingPost.theme)} {editingPost.theme}
                  </Badge>
                </div>
              )}
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={6}
                placeholder="Edit your amazing post content..."
                className="resize-none border-2 border-blue-200 focus:border-blue-400 rounded-xl text-sm"
              />
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 p-4 sm:p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-2 border-gray-300 rounded-xl text-sm w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={saveEditedPost}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-sm w-full sm:w-auto"
              >
                💾 Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-yellow-400 m-2">
            <DialogHeader className="p-4 sm:p-6">
              <DialogTitle className="text-lg sm:text-2xl font-bold text-yellow-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />📅 Schedule Your LinkedIn Post
              </DialogTitle>
              <DialogDescription className="text-yellow-600 text-sm">
                Choose when you want this post to be published
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 p-4 sm:p-6 pt-0">
              {schedulingPost && (
                <div className="aspect-video relative rounded-xl overflow-hidden border-2 border-yellow-300">
                  <img
                    src={schedulingPost.image || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className="absolute top-2 right-2 bg-blue-100 text-blue-800 font-medium shadow-lg text-xs"
                  >
                    {getThemeEmoji(schedulingPost.theme)} {schedulingPost.theme}
                  </Badge>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date" className="text-yellow-700 font-medium text-sm">
                    📅 Date
                  </Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={getTodayDate()}
                    className="border-2 border-yellow-400 rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time" className="text-yellow-700 font-medium text-sm">
                    🕐 Time
                  </Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="border-2 border-yellow-400 rounded-xl h-12"
                  />
                </div>
              </div>

              {scheduleDate && scheduleTime && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium text-sm">
                      Scheduled for: {formatScheduledDateTime(scheduleDate, scheduleTime)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 p-4 sm:p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => setIsScheduleDialogOpen(false)}
                className="border-2 border-gray-300 rounded-xl text-sm w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={saveScheduledPost}
                disabled={!scheduleDate || !scheduleTime}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-xl text-sm w-full sm:w-auto"
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
