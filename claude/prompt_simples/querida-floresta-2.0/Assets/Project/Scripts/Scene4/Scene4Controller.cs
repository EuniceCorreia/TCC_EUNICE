using UnityEngine;

public class Scene4Controller : DragAndDropSceneController
{
    private const float MISS_FEEDBACK_DELAY = 1f;
    private const float RAIN_DELAY = 1f, RAIN_DURATION = 15f;
    private const float CONGRATS_DELAY = 3f, LANDSLIDE_DELAY = 4f;
    private const float NEXT_SCENE_EXTRA_TIME = 5f;

    [SerializeField] private Scene4NarratorController narratorController;
    [SerializeField] private Scene4CanvasController canvasController;
    [SerializeField] private GameObject rainPrefab;

    protected override int Activity { get { return ActivityIndex.Scene4; } }
    protected override int RequiredCorrectDrops { get { return 3; } }
    protected override CanvasController Canvas { get { return canvasController; } }
    protected override SimpleNarratorController Narrator { get { return narratorController; } }

    protected override void onWrongDrop()
    {
        ApplicationModel.Scene4Misses++;
        audioController.missSound();
        this.InvokeAfter(MISS_FEEDBACK_DELAY, () => {
            canvasController.changeToTryAgainInterface();
            narratorController.playMissClickAudio();
        });
    }

    protected override void onAllItemsPlaced()
    {
        base.onAllItemsPlaced();

        audioController.sceneCompletedSound();
        this.InvokeAfter(
            RAIN_DELAY, () => RainEffect.Spawn(rainPrefab, RAIN_DURATION)
        );
        this.InvokeAfter(CONGRATS_DELAY, narratorController.playCongratsAudio);
        this.InvokeAfter(LANDSLIDE_DELAY, canvasController.landslide);
        this.InvokeAfter(
            narratorController.CongratsAudioLength + NEXT_SCENE_EXTRA_TIME,
            sceneLoader.loadScene5
        );
    }
}
