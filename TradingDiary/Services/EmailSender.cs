using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;

namespace TradingDiary.Services
{
    public class EmailSender
    {
        public static void SendEmail(string senderName, string senderEmail,
            string receiverName, string receiverEmail, string subject, string htmlContent)
        {
            var apiInstance = new TransactionalEmailsApi();

            SendSmtpEmailSender sender = new SendSmtpEmailSender(senderName, senderEmail);
            SendSmtpEmailTo receiver  = new SendSmtpEmailTo(receiverEmail, receiverName);
            
            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
            To.Add(receiver);

            string HtmlContent = htmlContent;
            string TextContent = null;
            try
            {
                var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null, HtmlContent, TextContent, subject);
                CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
                Console.WriteLine(result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
