import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon: Icon, onClick }) => {
  return (
    <Card
      className="bg-gradient-card border-border/50 shadow-elevation-md hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
