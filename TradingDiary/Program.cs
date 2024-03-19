using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using TradingDiary.Data;
using TradingDiary.Data.Identity;
using TradingDiary.Models.Entities;
using TradingDiary.Services;
using Newtonsoft.Json;

internal class Program
{
    private static void Main(string[] args)
    {
        using var database = new ApplicationDbContext();

        database.Database.EnsureCreated();

        var builder = WebApplication.CreateBuilder(args);

        ConfigureServices(builder);

        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseCors("corsPolicy");

        app.MapControllers();
        app.MapFallbackToFile("/index.html");

        app.Run();
    }

    private static void ConfigureServices(WebApplicationBuilder builder)
    {

        builder.Services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore); ;

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(option =>
        {
            option.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });
            option.OperationFilter<SecurityRequirementsOperationFilter>();
        });

        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<ITradeService, TradeService>();
        builder.Services.AddScoped<IEntryFactorService, EntryFactorService>();
        builder.Services.AddScoped<IStatisticsService, StatisticsService>();
        builder.Services.AddScoped<ICalculationService, CalculationService>();

        builder.Services.AddDbContext<ApplicationDbContext>();
        builder.Services.AddAutoMapper(typeof(Program).Assembly);

        builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(o => o.SignIn.RequireConfirmedAccount = true)
            .AddDefaultTokenProviders();

        builder.Services.AddTransient<IUserStore<ApplicationUser>, UserStore>();
        builder.Services.AddTransient<IRoleStore<ApplicationRole>, RoleStore>();
        builder.Services.AddTransient<UserTable>();
        builder.Services.AddTransient<RoleTable>();

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
          .AddJwtBearer(option =>
          {
              option.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuerSigningKey = true,
                  ValidateAudience = false,
                  ValidateIssuer = false,
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                          builder.Configuration.GetSection("AppSettings:Token").Value!))
              };
          });

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireUserRole",
                policy => policy.RequireRole("User"));

            options.AddPolicy("RequireAdminRole",
                policy => policy.RequireRole("Admin"));
        });

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("corsPolicy",
                              policy =>
                              {
                                  policy
                                       .WithOrigins("http://localhost:5173")
                                       .AllowAnyMethod()
                                       .AllowAnyHeader();
                              });
        });
    }
}