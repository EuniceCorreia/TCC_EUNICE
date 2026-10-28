using System.Linq;

// Session state shared between scenes (lost when the game closes)
public static class ApplicationModel
{
    public static bool isForestInTemporaryMode = true, lessClouds;

    // Whether the intro narration of each activity (ActivityIndex) must be
    // played on the next visit
    public static bool[] IsFirstTimeInActivity { get; } =
        Enumerable.Repeat(true, ActivityIndex.Count).ToArray();

    // Report data
    public static byte[] SceneAcesses { get; } = new byte[3];
    public static byte[] Scene1Misses { get; } = new byte[3];
    public static byte Scene2Misses { get; set; }
    public static byte[] Scene3Misses { get; } = new byte[3];
    public static byte Scene4Misses { get; set; }
    public static byte Scene5Misses { get; set; }
    public static byte Scene6Misses { get; set; }
    public static byte Scene7Misses { get; set; }
    public static byte Scene8Misses { get; set; }
    public static byte Scene9Misses { get; set; }
    public static byte[] Scene10Misses { get; } = new byte[3];
    public static double[] PlayerResponseTime { get; } = new double[3];
}
