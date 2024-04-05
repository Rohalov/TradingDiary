using AutoMapper;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;


namespace TodoList.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, UserDTO>();
            CreateMap<UserDTO, ApplicationUser>();
            CreateMap<RegisterRequest, ApplicationUser>();
            CreateMap<ApplicationUser, UserDataDTO>();
            CreateMap<UserDataDTO, ApplicationUser>();
        }
    }
}
