import { FormattedArticle } from "../types/newsSlice";

export interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export interface NewsCardProps {
  article: FormattedArticle;
  iconState?: { heart: boolean; share: boolean; save: boolean };
  onToggleIcon: (icon: "heart" | "share" | "save") => void;
  onClick: () => void;
}
export interface PopupModalProps {
  article: {
    image?: string;
    title?: string;
    description?: string;
  } | null;
  onClose: () => void;
}
export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export interface ViewMoreButtonProps {
  onClick: () => void;
  isVisible: boolean;
}
