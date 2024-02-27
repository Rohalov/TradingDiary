using AutoMapper;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Profiles
{
    public class TradeProfile : Profile 
    {
        public TradeProfile() 
        {
            CreateMap<Trade, TradeDTO>();
            CreateMap<TradeDTO, Trade>();
        }
    }
}
