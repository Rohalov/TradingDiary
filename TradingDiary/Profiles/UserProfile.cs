using AutoMapper;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;


namespace TodoList.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, UserDTO>();
            CreateMap<UserDTO, ApplicationUser>();
        }
    }
}
