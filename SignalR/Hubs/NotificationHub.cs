using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs;

public class NotificationHub : Hub
{
    public static int NotificationCount { get; set; } = 0;
    public static List<string> Messages { get; set; } = new List<string>();

    public async Task SendNotification(string notification)
    {
        if (notification == "fetch")
        {
            await Clients.Caller.SendAsync("newMessageSent", Messages, NotificationCount);
            return;
        }

        if (!string.IsNullOrEmpty(notification))
        {
            Messages.Add(notification);
            NotificationCount++;

            await Clients.All.SendAsync("newMessageSent", Messages, NotificationCount);
        }
    }
}
