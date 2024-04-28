export type ItemViewProps ={
    usersListData: {
      count?: number;
      next?: string;
      previous?: string;
      results?: {
        id: number;
        name: string;
        url: string;
        imagePath: string;
      }[];
    };
  }
  

export  type CardInfoProps = {
    cardInfo: {
      id: number;
      name: string;
      url: string;
      imagePath: string;
    };
  };