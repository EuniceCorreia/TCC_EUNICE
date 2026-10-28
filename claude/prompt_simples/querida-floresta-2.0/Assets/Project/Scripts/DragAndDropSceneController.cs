using UnityEngine;

// Scene where the player drags items to their slots. Plays the introduction
// on the first visit and counts the correct drops reported by the DropSlots.
public abstract class DragAndDropSceneController : MonoBehaviour
{
    [SerializeField] protected AudioController audioController;
    [SerializeField] protected GoogleSheetsController sheetsController;
    [SerializeField] protected SceneLoader sceneLoader;
    private int correctDrops;

    protected abstract int Activity { get; }
    protected abstract int RequiredCorrectDrops { get; }
    protected abstract CanvasController Canvas { get; }
    protected abstract SimpleNarratorController Narrator { get; }

    protected abstract void onWrongDrop();

    protected virtual void Start()
    {
        if (!ApplicationModel.IsFirstTimeInActivity[Activity]) return;
        ApplicationModel.IsFirstTimeInActivity[Activity] = false;

        // Blocks clicks until the introduction ends
        Canvas.showBackgroundCover();
        float introductionLength = Narrator.playIntroductionAudio();
        this.InvokeAfter(introductionLength, Canvas.hideBackgroundCover);
    }

    public void registerCorrectDrop()
    {
        if (++correctDrops < RequiredCorrectDrops) return;

        correctDrops = 0;
        onAllItemsPlaced();
    }

    public void registerWrongDrop()
    {
        correctDrops = 0;
        onWrongDrop();
    }

    protected virtual void onAllItemsPlaced()
    {
        // Next visit (a replay) plays the introduction again
        ApplicationModel.IsFirstTimeInActivity[Activity] = true;
        sheetsController.CompleteActivity(Activity);
    }
}
