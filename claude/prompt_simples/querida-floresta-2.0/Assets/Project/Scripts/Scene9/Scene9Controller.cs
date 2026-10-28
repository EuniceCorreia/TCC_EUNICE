using UnityEngine;

public class Scene9Controller : DragAndDropSceneController
{
    private const float MISS_FEEDBACK_DELAY = 1f;
    private const float CONGRATS_DELAY = 3f, NEXT_SCENE_EXTRA_TIME = 5f;

    [SerializeField] private Scene9NarratorController narratorController;
    [SerializeField] private Scene9CanvasController canvasController;

    protected override int Activity { get { return ActivityIndex.Scene9; } }
    protected override int RequiredCorrectDrops { get { return 3; } }
    protected override CanvasController Canvas { get { return canvasController; } }
    protected override SimpleNarratorController Narrator { get { return narratorController; } }

    protected override void onWrongDrop()
    {
        ApplicationModel.Scene9Misses++;
        audioController.missSound();
        this.InvokeAfter(MISS_FEEDBACK_DELAY, () => {
            canvasController.changeToTryAgainInterface();
            narratorController.playMissClickAudio();
        });
    }

    protected override void onAllItemsPlaced()
    {
        base.onAllItemsPlaced();

        canvasController.windPreventionAnimation();
        audioController.sceneCompletedSound();
        this.InvokeAfter(CONGRATS_DELAY, narratorController.playCongratsAudio);
        this.InvokeAfter(
            narratorController.CongratsAudioLength + NEXT_SCENE_EXTRA_TIME,
            sceneLoader.loadQuiz2
        );
    }
}
