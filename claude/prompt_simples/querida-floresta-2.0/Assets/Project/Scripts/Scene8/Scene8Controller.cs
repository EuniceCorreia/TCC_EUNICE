using UnityEngine;

public class Scene8Controller : DragAndDropSceneController
{
    private const float MISS_FEEDBACK_DELAY = 1f;
    private const float CONGRATS_DELAY = 3f, NEXT_SCENE_EXTRA_TIME = 5f;

    [SerializeField] private Scene8NarratorController narratorController;
    [SerializeField] private Scene8CanvasController canvasController;

    protected override int Activity { get { return ActivityIndex.Scene8; } }
    protected override int RequiredCorrectDrops { get { return 2; } }
    protected override CanvasController Canvas { get { return canvasController; } }
    protected override SimpleNarratorController Narrator { get { return narratorController; } }

    protected override void onWrongDrop()
    {
        ApplicationModel.Scene8Misses++;
        audioController.missSound();
        this.InvokeAfter(MISS_FEEDBACK_DELAY, () => {
            canvasController.changeToTryAgainInterface();
            narratorController.playMissClickAudio();
        });
    }

    protected override void onAllItemsPlaced()
    {
        base.onAllItemsPlaced();

        canvasController.erosionAnimation();
        audioController.sceneCompletedSound();
        this.InvokeAfter(CONGRATS_DELAY, narratorController.playCongratsAudio);
        this.InvokeAfter(
            narratorController.CongratsAudioLength + NEXT_SCENE_EXTRA_TIME,
            sceneLoader.loadScene9
        );
    }
}
