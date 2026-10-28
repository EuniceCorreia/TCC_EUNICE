using System;
using UnityEngine;
using UnityEngine.UI;

// Scene where the player chooses between the cow, the garbage and the trees.
// Only the trees are the right choice; the others lead to the try again
// interface.
public abstract class ThreeChoicesSceneController : MonoBehaviour
{
    private const float COW_SELECTED_AUDIO_LENGTH = 7.76f;
    private const float TRASH_SELECTED_AUDIO_LENGTH = 8.49f;
    private const float HELP_AUDIO_LENGTH = 9f;

    [SerializeField] private Button cowButton, garbageButton, treesButton;
    [SerializeField] private GameObject cowObject, garbageObject, treesObject;
    [SerializeField] protected SceneLoader sceneLoader;
    [SerializeField] protected GoogleSheetsController sheetsController;

    // Length of the introduction played in this visit (0 if skipped)
    protected float playedIntroLength;

    protected abstract int Activity { get; }
    protected abstract float IntroAudioLength { get; }
    // Time between scheduling a narration and the narrator starting it
    protected abstract float NarrationDelay { get; }
    protected abstract HelpAndTryAgainCanvasController Canvas { get; }
    protected abstract ThreeChoicesNarratorController Narrator { get; }

    protected abstract void registerMiss();
    protected abstract void onTreesChosen();
    protected virtual void onChoiceMade() {}

    protected virtual void Start()
    {
        if (ApplicationModel.IsFirstTimeInActivity[Activity]) {
            ApplicationModel.IsFirstTimeInActivity[Activity] = false;
            playedIntroLength = IntroAudioLength;
            Canvas.showBackgroundCover();
            narrate(
                0f, Narrator.playIntroductionAudio, playedIntroLength,
                Canvas.hideBackgroundCover
            );
        }

        cowButton.onClick.AddListener(() => {
            choose(cowObject, cowButton);
            chooseWrong(Narrator.playCowSelectedAudio, COW_SELECTED_AUDIO_LENGTH);
        });

        garbageButton.onClick.AddListener(() => {
            choose(garbageObject, garbageButton);
            chooseWrong(Narrator.playTrashSelectedAudio, TRASH_SELECTED_AUDIO_LENGTH);
        });

        treesButton.onClick.AddListener(() => {
            choose(treesObject, treesButton);
            // A replay after completing it starts with the introduction again
            ApplicationModel.IsFirstTimeInActivity[Activity] = true;
            onTreesChosen();
        });
    }

    public void showHelp() // Called by Button (btHelp)
    {
        narrate(0f, Narrator.playHelpAudio, HELP_AUDIO_LENGTH, Canvas.leaveHelpInterface);
        Canvas.changeToHelpInterface();
    }

    // Schedules a narration to `startTime` and `onFinished` to when it ends.
    // Returns the end time, so narrations can be chained.
    protected float narrate(
        float startTime, Action narration, float audioLength,
        Action onFinished = null)
    {
        this.InvokeAfter(startTime + NarrationDelay, narration);
        if (onFinished != null) this.InvokeAfter(startTime + audioLength, onFinished);

        return startTime + audioLength;
    }

    // Covers the scene, disables the choices and reveals the chosen element
    private void choose(GameObject chosenObject, Button chosenButton)
    {
        Button[] buttons = {cowButton, treesButton, garbageButton};

        onChoiceMade();
        Canvas.showBackgroundCover();
        foreach (Button button in buttons) button.onClick.RemoveAllListeners();
        Destroy(chosenButton.gameObject);
        chosenObject.SetActive(true);
    }

    private void chooseWrong(Action narration, float audioLength)
    {
        registerMiss();
        narrate(0f, narration, audioLength, Canvas.changeToTryAgainInterface);
    }
}
