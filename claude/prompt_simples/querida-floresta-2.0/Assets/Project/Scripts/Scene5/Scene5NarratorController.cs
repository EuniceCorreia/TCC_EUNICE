public class Scene5NarratorController : ThreeChoicesNarratorController
{
    public override void playSceneCompletedAudio()
    {
        audioController.sceneCompletedSound();
    }
}
