using AutoMapper;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;


namespace TodoList.Profiles
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<ApplicationRole, RoleDTO>();
            CreateMap<RoleDTO, ApplicationRole>();
        }
    }
}
