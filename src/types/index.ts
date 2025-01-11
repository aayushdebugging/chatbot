export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isEditing?: boolean;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  isVoice?: boolean;
}