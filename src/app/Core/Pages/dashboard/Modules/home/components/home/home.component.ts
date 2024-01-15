import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../bookings/services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBookings, IBookingsTable } from '../../../bookings/model/booking';
import { AdsService } from '../../../ads/services/ads.service';
import { IAds, IAdsData, IAdsResponse } from '../../../ads/models/ads';
import { FacilitiesService } from '../../../facilities/Services/facilities.service';
import { IRooms } from '../../../rooms/model/room';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { UsersService } from '../../../users/services/users.service';
import { IlistTable, IlistUser } from '../../../users/model/users';
import {
  TimelineCreatedDate,
  TimelineEndedDate,
  TimelineStartedDate,
  TimelineUpdatedDate,
} from '../../models/timeline';
interface IMenu {
  title: string;
  icon: string;
  link: string;
  length: any;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  bookingResponse: IBookingsTable | undefined;
  listBookings: IBookings[] = [];
  selectedValue = new Date();
  reverse = false;
  adsResponse: IAdsResponse | undefined;
  adsData: IAdsData | undefined;
  adsItems: IAds[] | any;
  facilitesResponse: any;
  facilitesData: any;
  roomsResponse: any;
  roomsData: IRooms[] = [];
  listUses: IlistUser[] | any;
   usersResponse:  IlistTable = {
     totalCount: 2,
     listuser: []
   };
  allDates: any[] = [];
  createdDate: TimelineCreatedDate[] = [];
  updatedDate: TimelineUpdatedDate[] = [];
  startedBokkingDate: TimelineStartedDate[] = [];
  endedBookingData: TimelineEndedDate[] = [];
  showMore = true;
  showMore2=true;
  
  menu: IMenu[] = [
    {
      title: 'Users',
      icon: 'fa-solid fa-users',
      link: '/dashboard/users',
       length:this.usersResponse?.totalCount 
    },
    {
      title: 'Rooms',
      icon: 'fa-solid fa-list-check',
      link: '/dashboard/rooms',
      length:this.usersResponse.totalCount 

    },
    {
      title: 'Facilities',
      icon: 'fa-solid fa-hand-holding-heart',
      link: '/dashboard/Facilities',
      length:this.usersResponse.totalCount 

    },
    {
      title: 'Ads',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/ads',
      length:this.usersResponse.totalCount 

    },
    {
      title: 'Booking',
      icon: 'fa-solid fa-bookmark',
      link: '/dashboard/booking',
      length:this.usersResponse.totalCount 

    },
  ];
  
  // countUser: number | undefined;
  constructor(
    
  
    
    private _BookingService: BookingService,
    private _adsService: AdsService,
    private dialog: MatDialog,
    private _facilitiesService: FacilitiesService,
    private _toastrService: ToastrService,
    private _roomsService: RoomsService,
    private _UsersService: UsersService,

  ) {
   
  }

  ngOnInit() {
    this.getAllBookings();
    this.getAllAds();
    this.getAllFacilities();
    this.onGetAllUsers();
    this.getAllRooms();
    console.log(this.allDates);
    console.log(this.createdDate);
    console.log(this.updatedDate);
    console.log(this.startedBokkingDate);
    console.log(this.endedBookingData);

  }

  getAllBookings() {
    let params = {};
    this._BookingService.onGetAllBookings(params).subscribe({
      next: (res) => {
        this.bookingResponse = res.data;
        this.listBookings = res?.data?.booking;
        this.listBookings.forEach((booking) => {
          const createdDate = new Date(booking.createdAt);
          const userName = booking.user?.userName || 'No User';
          const moduleName = 'booking';

          this.createdDate.push({
            name: userName,
            createdDate: createdDate,
            module: moduleName,
          });
        });
        this.listBookings.forEach((booking) => {
          const updatedDate = new Date(booking.updatedAt);
          const userName = booking.user?.userName || 'No User';
          const moduleName = 'booking';

          this.updatedDate.push({
            name: userName,
            updatedDate: updatedDate,
            module: moduleName,
          });
        });
        this.listBookings.forEach((booking) => {
          const startDate = new Date(booking.startDate);
          const userName = booking.user?.userName || 'No User';
          const moduleName = 'booking';

          this.startedBokkingDate.push({
            name: userName,
            startedDate: startDate,
            module: moduleName,
          });
        });
        this.listBookings.forEach((booking) => {
          const endDate = new Date(booking.endDate);
          const userName = booking.user?.userName || 'No User';
          const moduleName = 'booking';

          this.endedBookingData.push({
            name: userName,
            endedDate: endDate,
            module: moduleName,
          });
        });
      },
    });
  }
  getAllAds() {
    let parms = {};
    this._adsService.getAllAds(parms).subscribe({
      next: (res) => {
        this.adsResponse = res;
        this.adsData = this.adsResponse?.data;
        this.adsItems = this.adsData?.ads;
        this.adsItems.forEach(
          (ad: {
            createdAt: string | number | Date;
            room: { roomNumber: string };
          }) => {
            const createdDate = new Date(ad.createdAt);
            const roomNumber = ad.room?.roomNumber || 'No room number';
            const moduleName = 'ad';

            this.createdDate.push({
              name: roomNumber,
              createdDate: createdDate,
              module: moduleName,
            });
          }
        );
        this.adsItems.forEach(
          (ad: {
            updatedDate: string | number | Date;
            room: { roomNumber: string };
          }) => {
            const updatedDate = new Date(ad.updatedDate);
            const roomNumber = ad.room?.roomNumber || 'No room number';
            const moduleName = 'ad';

            this.updatedDate.push({
              name: roomNumber,
              updatedDate: updatedDate,
              module: moduleName,
            });
          }
        );
      },
    });
  }
  getAllFacilities() {
    let parms = {};
    this._facilitiesService.getAllFacilities(parms).subscribe({
      next: (res: any) => {
        this.facilitesResponse = res.data;
        this.facilitesData = this.facilitesResponse?.facilities;
        this.facilitesData.forEach(
          (facilities: { createdAt: string | number | Date; name: string }) => {
            const createdDate = new Date(facilities.createdAt);
            const facilityName = facilities.name || '';
            const moduleName = 'facility';

            this.createdDate.push({
              name: facilityName,
              createdDate: createdDate,
              module: moduleName,
            });
          }
        );
        this.facilitesData.forEach(
          (facilities: {
            updatedAt: string | number | Date;
            createdAt: string | number | Date;
            name: string;
          }) => {
            const updatedDate = new Date(facilities.updatedAt);
            const facilityName = facilities.name || '';
            const moduleName = 'facility';

            this.updatedDate.push({
              name: facilityName,
              updatedDate: updatedDate,
              module: moduleName,
            });
          }
        );
      },
    });
  }

  getAllRooms() {
    let parms = {};

    this._roomsService.onGetAllRooms(parms).subscribe({
      next: (res) => {
        this.roomsResponse = res.data;
        this.roomsData = this.roomsResponse?.rooms;
        this.roomsData.forEach(
          (room) => {
            const createdDate = new Date(room.createdAt);
            const roomName = room.roomNumber || 'no room name';
            const moduleName = 'room';

            this.createdDate.push({
              name: roomName,
              createdDate: createdDate,
              module: moduleName,
            });
          }
        );
        this.roomsData.forEach(
          (room) => {
            const updatedDate = new Date(room.updatedAt);
            const roomName = room.roomNumber || 'no room name';
            const moduleName = 'room';

            this.updatedDate.push({
              name: roomName,
              updatedDate: updatedDate,
              module: moduleName,
            });
      }
        )
    }
  }) }
  onGetAllUsers() {
    let params = {};
    this._UsersService.geAllUsers(params).subscribe({
      next: (res: any) => {
        this.usersResponse = res.data;
        this.listUses = res.data.users;
        this.listUses.forEach(
          (user: { createdAt: string | number | Date; userName: string; }) => {
            const createdDate = new Date(user.createdAt);
            const userName = user.userName || 'no user name';
            const moduleName = 'user';

            this.createdDate.push({
              name: userName,
              createdDate: createdDate,
              module: moduleName,
            });
          }
        );
        this.listUses.forEach(
          (user: { updatedAt: string | number | Date; userName: string; }) => {
            const updatedDate = new Date(user.updatedAt);
            const userName = user.userName || 'no user name';
            const moduleName = 'user';

            this.updatedDate.push({
              name: userName,
              updatedDate: updatedDate,
              module: moduleName,
            });
      }
        )
      },
    });
  }
  selectChange(select: Date): void {
    this.allDates.forEach((date) => {});
    console.log(`Select value: ${select} `);
  }
  isDateSelected(date: Date): boolean {
    return (
      this.selectedValue && this.selectedValue.getTime() === date.getTime()
    );
  }
  toggleReverse(): void {
    this.reverse = !this.reverse;
  }
}
