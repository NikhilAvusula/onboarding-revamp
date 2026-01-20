export interface StatsItem {
  id: number;
  status: string;
  time: string;
  applications: number;
}

export interface CategoryStats {
  id: number;
  category: 'active' | 'favourites' | 'closed';
  overallApplications: number;
  statsData: StatsItem[];
}

export interface MerchantItem {
  merchantId: number;
  product: string;
  creationDate: string;
  stage: string;
  merchantName: string;
  contactName: string;
  isFavourite:boolean;
}

export interface DashboardState {
  activeFilter: 'active' | 'favourites' | 'closed';
  statsData: CategoryStats[];
  merchantsList: MerchantItem[];
  activeStatus: string;
  searchQuery: string;
  searchedMerchantsList: MerchantItem[];
}