using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;
using SignalR.Models;

namespace SignalR.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> hubContext;

        public HomeController(
            ILogger<HomeController> logger,
            IHubContext<DeathlyHallowsHub> hubContext
        )
        {
            _logger = logger;
            this.hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Notification()
        {
            return View();
        }

        public IActionResult DeathlyHallowsRace()
        {
            return View();
        }

        public IActionResult HouseGroup()
        {
            return View();
        }

        public IActionResult BasicChat()
        {
            return View();
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (StaticDetails.DeathlyHallowRace.ContainsKey(type))
                StaticDetails.DeathlyHallowRace[type]++;

            await hubContext.Clients.All.SendAsync(
                "updateDeathlyHallowsCount",
                StaticDetails.DeathlyHallowRace[StaticDetails.Cloak],
                StaticDetails.DeathlyHallowRace[StaticDetails.Stone],
                StaticDetails.DeathlyHallowRace[StaticDetails.Wand]
            );
            return Accepted();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(
                new ErrorViewModel
                {
                    RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
                }
            );
        }
    }
}
