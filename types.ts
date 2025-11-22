export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuResponse {
  items: MenuItem[];
  theme_color?: string; // Optional visual hint
}