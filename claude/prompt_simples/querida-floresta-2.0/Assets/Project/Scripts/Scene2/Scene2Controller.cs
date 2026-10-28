using System;
using UnityEngine;

public class Scene2Controller : ThreeChoicesSceneController
{
    private const float INTRO_AUDIO_LENGTH = 27.66f;
    private const float TREES_SELECTED_AUDIO_LENGTH = 8.74f;
    private const float ABOUT_ROOTS_AUDIO_LENGTH = 9.89f;
    private const float ABOUT_EVAPORATION_AUDIO_LENGTH = 16.56f;
    private const float ABOUT_RAIN_AUDIO_LENGTH = 8.96f;
    private const float SCENE_COMPLETED_AUDIO_LENGTH = 9f;
    private const float RAIN_DURATION = 8f;

    [SerializeField] private GameObject rainPrefab;
    [SerializeField] private SpritesS2Controller spritesController;
    [SerializeField] private CanvasS2Controller canvasController;
    [SerializeField] private Scene2NarratorController narratorController;
    private DateTime timeStarted;

    protected override int Activity { get { return ActivityIndex.Scene2; } }
    protected override float IntroAudioLength { get { return INTRO_AUDIO_LENGTH; } }
    protected override float NarrationDelay { get { return 1f; } }
    protected override HelpAndTryAgainCanvasController Canvas { get { return canvasController; } }
    protected override ThreeChoicesNarratorController Narrator { get { return narratorController; } }

    public void setFirstTimeInScene() // Called by Button (btQuit)
    {
        ApplicationModel.IsFirstTimeInActivity[Activity] = true;
    }

    protected override void Start()
    {
        timeStarted = DateTime.Now;
        ApplicationModel.SceneAcesses[Activity]++;
        base.Start();
    }

    protected override void registerMiss()
    {
        ApplicationModel.Scene2Misses++;
    }

    // Response time: from the end of the introduction to the first choice
    protected override void onChoiceMade()
    {
        if (
            !Player.Instance.ScenesCompleted[Activity] &&
            ApplicationModel.PlayerResponseTime[Activity] == 0
        ) {
            ApplicationModel.PlayerResponseTime[Activity] =
                (DateTime.Now - timeStarted).TotalSeconds - playedIntroLength;
        }
    }

    // The narrator explains how the trees help with the rain, while the
    // scene is transformed
    protected override void onTreesChosen()
    {
        bool wasAlreadyCompleted = Player.Instance.ScenesCompleted[Activity];

        float time = narrate(
            0f, narratorController.playTreesSelectedAudio,
            TREES_SELECTED_AUDIO_LENGTH, spritesController.showTreesRoots
        );
        time = narrate(
            time, narratorController.playAboutRootsAudio,
            ABOUT_ROOTS_AUDIO_LENGTH
        );
        time = narrate(
            time, narratorController.playAboutEvaporationAudio,
            ABOUT_EVAPORATION_AUDIO_LENGTH,
            () => RainEffect.Spawn(rainPrefab, RAIN_DURATION)
        );
        time = narrate(
            time, narratorController.playAboutRainAudio,
            ABOUT_RAIN_AUDIO_LENGTH,
            spritesController.turnSceneGreenAndAnimalsHappy
        );
        narrate(
            time, narratorController.playSceneCompletedAudio,
            SCENE_COMPLETED_AUDIO_LENGTH,
            () => sceneLoader.loadAfterActivity(wasAlreadyCompleted)
        );

        if (sheetsController.CompleteActivity(Activity)) sendDataToReport();
    }

    private void sendDataToReport()
    {
        ReportCreator.writeLine("\nAtividade 2");
        ReportCreator.writeMisses(ApplicationModel.Scene2Misses);
        ReportCreator.writeResponseTime(ApplicationModel.PlayerResponseTime[Activity]);
    }
}
