using UnityEngine;

public class ConnectController : DragAndDropSceneController
{
    private const float RELOAD_DELAY = 6f;
    private const float CONGRATS_DELAY = 2f, NEXT_SCENE_EXTRA_TIME = 4f;

    [SerializeField] private ConnectNarratorController narratorController;
    [SerializeField] private ConnectCanvasController canvasController;

    protected override int Activity { get { return ActivityIndex.ConnectElements; } }
    protected override int RequiredCorrectDrops { get { return 3; } }
    protected override CanvasController Canvas { get { return canvasController; } }
    protected override SimpleNarratorController Narrator { get { return narratorController; } }

    // Last question of the final quiz: a miss restarts this scene
    protected override void onWrongDrop()
    {
        ApplicationModel.Scene10Misses[2]++;

        canvasController.showBackgroundCover();
        audioController.missSound();
        narratorController.playMissClickAudio();
        this.InvokeAfter(RELOAD_DELAY, sceneLoader.loadConnectFigures);
    }

    protected override void onAllItemsPlaced()
    {
        base.onAllItemsPlaced();

        audioController.sceneCompletedSound();
        this.InvokeAfter(CONGRATS_DELAY, narratorController.playCongratsAudio);
        this.InvokeAfter(
            narratorController.CongratsAudioLength + NEXT_SCENE_EXTRA_TIME,
            sceneLoader.loadMainMenu
        );
    }
}
