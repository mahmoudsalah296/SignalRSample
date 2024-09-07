﻿namespace SignalR;

public static class StaticDetails
{
    static StaticDetails()
    {
        DeathlyHallowRace = new Dictionary<string, int>
        {
            { Wand, 0 },
            { Stone, 0 },
            { Cloak, 0 }
        };
    }

    public const string Wand = "wand";
    public const string Stone = "stone";
    public const string Cloak = "cloak";

    public static Dictionary<string, int> DeathlyHallowRace;
}
