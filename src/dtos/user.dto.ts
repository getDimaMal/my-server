export interface UserParams {
  id: string;
}

export interface CreateUserDto {
  balance: number;
}

export interface UpdateUserDto {
  balance: number;
}

export interface BuyItemDto {
  userId: string;
  itemId: string;
  price: number;
}