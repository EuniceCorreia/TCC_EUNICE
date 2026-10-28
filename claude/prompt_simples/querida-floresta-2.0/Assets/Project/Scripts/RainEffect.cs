using UnityEngine;
using DigitalRuby.RainMaker;

public static class RainEffect
{
    private const float WIDTH_MULTIPLIER = 1.12f;

    // Spawns the 2D rain prefab and destroys it after `duration` seconds
    public static void Spawn(GameObject rainPrefab, float duration)
    {
        RainScript2D rainScript =
            Object.Instantiate(rainPrefab).GetComponent<RainScript2D>();
        rainScript.RainHeightMultiplier = 0f;
        rainScript.RainWidthMultiplier = WIDTH_MULTIPLIER;
        Object.Destroy(rainScript.gameObject, duration);
    }
}
