using UnityEngine;

public class Scene5Controller : ThreeChoicesSceneController
{
    private const float INTRO_AUDIO_LENGTH = 6.2f;
    private const float TREES_SELECTED_AUDIO_LENGTH = 12.4f;
    private const float SCENE_COMPLETED_START = 12.6f;
    private const float NEXT_SCENE_DELAY = 2f;

    [SerializeField] private Scene5CanvasController canvasController;
    [SerializeField] private Scene5NarratorController narratorController;

    protected override int Activity { get { return ActivityIndex.Scene5; } }
    protected override float IntroAudioLength { get { return INTRO_AUDIO_LENGTH; } }
    protected override float NarrationDelay { get { return 0f; } }
    protected override HelpAndTryAgainCanvasController Canvas { get { return canvasController; } }
    protected override ThreeChoicesNarratorController Narrator { get { return narratorController; } }

    protected override void registerMiss()
    {
        ApplicationModel.Scene5Misses++;
    }

    protected override void onTreesChosen()
    {
        narrate(0f, narratorController.playTreesSelectedAudio, TREES_SELECTED_AUDIO_LENGTH);
        narrate(
            SCENE_COMPLETED_START, narratorController.playSceneCompletedAudio,
            NEXT_SCENE_DELAY, sceneLoader.loadScene6
        );

        sheetsController.CompleteActivity(Activity);
    }
}
