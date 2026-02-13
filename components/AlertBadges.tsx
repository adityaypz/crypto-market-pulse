import { ThemeDelta } from '@/lib/logic/deltas';

interface AlertBadgesProps {
    themes: ThemeDelta[];
    volatilityValue: number;
    breadth: number;
}

export default function AlertBadges({ themes, volatilityValue, breadth }: AlertBadgesProps) {
    const alerts: Array<{ icon: string; text: string; color: string }> = [];

    // Security alert: Security theme in top 3 AND increasing
    const securityTheme = themes.slice(0, 3).find(t => t.theme.toLowerCase() === 'security');
    if (securityTheme && securityTheme.delta > 0) {
        alerts.push({
            icon: '🔒',
            text: 'Security Alert',
            color: 'bg-red-500/10 text-red-400 border-red-500/20',
        });
    }

    // Elevated volatility
    if (volatilityValue > 4) {
        alerts.push({
            icon: '⚡',
            text: 'Elevated Volatility',
            color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        });
    }

    // Weak breadth
    if (breadth < 40) {
        alerts.push({
            icon: '⚠',
            text: 'Weak Breadth',
            color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        });
    }

    if (alerts.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${alert.color}`}
                >
                    <span>{alert.icon}</span>
                    <span>{alert.text}</span>
                </div>
            ))}
        </div>
    );
}
