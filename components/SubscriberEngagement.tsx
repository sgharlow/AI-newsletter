'use client';

import { useState, useEffect, useMemo } from 'react';

// Types
interface EngagementMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  growthRate: number;
  avgTimeToOpen: number; // minutes
  bestSendDay: string;
  bestSendTime: string;
}

interface SubscriberSegment {
  name: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
}

interface EngagementTrend {
  date: string;
  opens: number;
  clicks: number;
  subscribers: number;
}

interface TopLink {
  url: string;
  label: string;
  clicks: number;
  ctr: number;
}

interface SubscriberEngagementProps {
  projectId?: string;
  className?: string;
}

// Engagement scoring algorithm
function calculateEngagementScore(metrics: EngagementMetrics): number {
  // Weighted scoring: opens (40%), clicks (30%), retention (20%), growth (10%)
  const openScore = Math.min((metrics.openRate / 35) * 100, 100) * 0.4;
  const clickScore = Math.min((metrics.clickRate / 10) * 100, 100) * 0.3;
  const retentionScore = Math.max(0, (1 - metrics.unsubscribeRate / 5) * 100) * 0.2;
  const growthScore = Math.min((metrics.growthRate / 20) * 100, 100) * 0.1;

  return Math.round(openScore + clickScore + retentionScore + growthScore);
}

// Segment subscribers by engagement level
function segmentSubscribers(total: number): SubscriberSegment[] {
  return [
    {
      name: 'Champions',
      count: Math.round(total * 0.15),
      percentage: 15,
      color: '#10B981',
      description: 'Open every email, click frequently',
    },
    {
      name: 'Engaged',
      count: Math.round(total * 0.35),
      percentage: 35,
      color: '#3B82F6',
      description: 'Open most emails, occasional clicks',
    },
    {
      name: 'Casual',
      count: Math.round(total * 0.30),
      percentage: 30,
      color: '#F59E0B',
      description: 'Open sometimes, rarely click',
    },
    {
      name: 'At Risk',
      count: Math.round(total * 0.15),
      percentage: 15,
      color: '#EF4444',
      description: 'Haven\'t opened in 30+ days',
    },
    {
      name: 'Dormant',
      count: Math.round(total * 0.05),
      percentage: 5,
      color: '#6B7280',
      description: 'No activity in 60+ days',
    },
  ];
}

export function SubscriberEngagement({ projectId, className }: SubscriberEngagementProps) {
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null);
  const [trends, setTrends] = useState<EngagementTrend[]>([]);
  const [topLinks, setTopLinks] = useState<TopLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Load engagement data
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // Simulate API call - in production, fetch from Supabase
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - replace with actual API call
      setMetrics({
        totalSubscribers: 1247,
        activeSubscribers: 1089,
        openRate: 34.2,
        clickRate: 8.7,
        unsubscribeRate: 0.3,
        growthRate: 12.5,
        avgTimeToOpen: 45,
        bestSendDay: 'Tuesday',
        bestSendTime: '9:00 AM',
      });

      // Generate trend data
      const now = new Date();
      const trendData: EngagementTrend[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        trendData.push({
          date: date.toISOString().split('T')[0],
          opens: Math.floor(Math.random() * 50) + 30,
          clicks: Math.floor(Math.random() * 20) + 5,
          subscribers: 1200 + Math.floor(Math.random() * 100),
        });
      }
      setTrends(trendData);

      setTopLinks([
        { url: '/recipes/email-automation', label: 'Email Automation Recipe', clicks: 234, ctr: 18.7 },
        { url: '/recipes/lead-gen', label: 'Lead Generation Guide', clicks: 189, ctr: 15.1 },
        { url: '/resources/templates', label: 'Free Templates Pack', clicks: 156, ctr: 12.5 },
        { url: '/pricing', label: 'Pricing Page', clicks: 98, ctr: 7.8 },
        { url: '/blog/automation-roi', label: 'Automation ROI Article', clicks: 87, ctr: 7.0 },
      ]);

      setLoading(false);
    }

    loadData();
  }, [projectId, timeRange]);

  const segments = useMemo(() => {
    if (!metrics) return [];
    return segmentSubscribers(metrics.totalSubscribers);
  }, [metrics]);

  const engagementScore = useMemo(() => {
    if (!metrics) return 0;
    return calculateEngagementScore(metrics);
  }, [metrics]);

  const scoreColor = engagementScore >= 80 ? 'text-green-600' : engagementScore >= 60 ? 'text-blue-600' : engagementScore >= 40 ? 'text-yellow-600' : 'text-red-600';
  const scoreLabel = engagementScore >= 80 ? 'Excellent' : engagementScore >= 60 ? 'Good' : engagementScore >= 40 ? 'Fair' : 'Needs Work';

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className={className}>
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscriber Engagement</h2>
          <p className="text-gray-600">Track how subscribers interact with your content</p>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold ${scoreColor}`}>{engagementScore}</div>
          <div className="text-sm text-gray-500">Engagement Score</div>
          <div className={`text-xs font-medium ${scoreColor}`}>{scoreLabel}</div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {(['7d', '30d', '90d'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Subscribers"
          value={metrics.totalSubscribers.toLocaleString()}
          trend={`+${metrics.growthRate}%`}
          trendUp={true}
          icon="👥"
        />
        <MetricCard
          label="Open Rate"
          value={`${metrics.openRate}%`}
          trend={metrics.openRate > 25 ? 'Above average' : 'Below average'}
          trendUp={metrics.openRate > 25}
          icon="📬"
        />
        <MetricCard
          label="Click Rate"
          value={`${metrics.clickRate}%`}
          trend={metrics.clickRate > 5 ? 'Strong' : 'Needs improvement'}
          trendUp={metrics.clickRate > 5}
          icon="🔗"
        />
        <MetricCard
          label="Active Rate"
          value={`${Math.round((metrics.activeSubscribers / metrics.totalSubscribers) * 100)}%`}
          trend={`${metrics.activeSubscribers.toLocaleString()} active`}
          trendUp={true}
          icon="⚡"
        />
      </div>

      {/* Engagement Segments */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscriber Segments</h3>

        {/* Segment Bar */}
        <div className="flex h-8 rounded-full overflow-hidden mb-4">
          {segments.map((segment, i) => (
            <div
              key={segment.name}
              className="flex items-center justify-center text-xs font-medium text-white"
              style={{
                backgroundColor: segment.color,
                width: `${segment.percentage}%`,
                marginLeft: i > 0 ? '2px' : 0,
              }}
            >
              {segment.percentage >= 10 && `${segment.percentage}%`}
            </div>
          ))}
        </div>

        {/* Segment Details */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {segments.map(segment => (
            <div key={segment.name} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="font-medium text-gray-900">{segment.name}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{segment.count}</div>
              <div className="text-xs text-gray-500">{segment.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Performing Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clicked Links</h3>
          <div className="space-y-3">
            {topLinks.map((link, index) => (
              <div key={link.url} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{link.label}</p>
                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{link.clicks}</p>
                  <p className="text-xs text-gray-500">{link.ctr}% CTR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send Time Optimization */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimal Send Times</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Best Day</p>
                <p className="text-sm text-green-700">{metrics.bestSendDay}</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Best Time</p>
                <p className="text-sm text-blue-700">{metrics.bestSendTime} local time</p>
              </div>
              <div className="text-3xl">⏰</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-900">Avg. Time to Open</p>
                <p className="text-sm text-purple-700">{metrics.avgTimeToOpen} minutes</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Schedule your next email for {metrics.bestSendDay} at {metrics.bestSendTime} for optimal engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">📈 Engagement Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <RecommendationCard
            title="Re-engage At Risk"
            description={`Send a win-back campaign to ${segments.find(s => s.name === 'At Risk')?.count || 0} subscribers`}
            impact="Medium"
          />
          <RecommendationCard
            title="Optimize Subject Lines"
            description="A/B test subject lines to improve your 34.2% open rate"
            impact="High"
          />
          <RecommendationCard
            title="Add More CTAs"
            description="Include 2-3 relevant links per email to boost clicks"
            impact="Medium"
          />
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  label,
  value,
  trend,
  trendUp,
  icon
}: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

// Recommendation Card Component
function RecommendationCard({
  title,
  description,
  impact
}: {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}) {
  const impactColor = impact === 'High' ? 'bg-red-500' : impact === 'Medium' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${impactColor}`} />
        <span className="text-xs uppercase tracking-wide opacity-80">{impact} Impact</span>
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}

export default SubscriberEngagement;
