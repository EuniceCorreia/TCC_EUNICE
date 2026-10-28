using UnityEngine;

public class Scene2NarratorController : ThreeChoicesNarratorController
{
    [SerializeField] private AudioSource aboutRootsAudio, aboutEvaporationAudio,
    aboutRainAudio, sceneCompletedAudio;

    public void playAboutRootsAudio()
    {
        playAudio(aboutRootsAudio);
    }

    public void playAboutEvaporationAudio()
    {
        playAudio(aboutEvaporationAudio);
    }

    public void playAboutRainAudio()
    {
        playAudio(aboutRainAudio);
    }

    public override void playSceneCompletedAudio()
    {
        audioController.sceneCompletedSound();
        playAudio(sceneCompletedAudio);
    }
}
