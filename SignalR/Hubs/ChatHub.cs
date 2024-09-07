using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs;

public class ChatHub : Hub
{
    private readonly ApplicationDbContext dbContext;

    public ChatHub(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task SendPublicMessage(string sender, string message)
    {
        if (!string.IsNullOrEmpty(message))
            await Clients.All.SendAsync("newMessage", sender, message);
    }

    [Authorize]
    public async Task SendPrivateMessage(string sender, string receiver, string message)
    {
        var userId = dbContext
            .Users.FirstOrDefault(u => u.Email.ToLower() == receiver.ToLower())
            ?.Id;

        if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(message))
            await Clients.User(userId).SendAsync("newMessage", sender, message);
    }
}
