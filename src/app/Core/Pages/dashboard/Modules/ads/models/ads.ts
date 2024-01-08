import { IUserAdmin } from 'src/app/Shared/models/iuser-admin';
import { IRoom } from '../../rooms/model/room';

export interface IAdsResponse {
  success: true;
  message: string;
  data: IAdsData;
}
export interface IAdsData {
  ads: IAds[];
  totalCount: number;
}

export interface IAds {
  _id: string;
  isActive: boolean;
  room: IRoom;
  createdBy: IUserAdmin;
  createdAt: string;
  updatedAt: string;
}
