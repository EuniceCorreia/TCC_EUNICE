using System;
using UnityEngine;
using UnityEngine.UI;

// After activities 1 to 3, the player clicks to unlock the new reward and
// then goes to the next activity
public class PlayersForestController : MonoBehaviour
{
    private const float UNLOCK_AUDIO_DELAY = 1f;
    private const float CLICK_ENABLE_EXTRA_TIME = 1f;
    private const float NEXT_SCENE_DELAY = 8f;

    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private CanvasPFController canvasController;
    [SerializeField] private AudioController audioController;
    [SerializeField] private NarratorPFController narratorController;
    private Action loadNextScene;

    void Start()
    {
        bool hasNewReward = ApplicationModel.isForestInTemporaryMode &&
            Player.Instance.ScenesCompleted[ActivityIndex.Scene1];

        if (hasNewReward) {
            this.InvokeAfter(UNLOCK_AUDIO_DELAY, narratorController.playUnlockAudio);
            loadNextScene = findNextScene();
            canvasController.setLockedEffect();
            this.InvokeAfter(
                narratorController.UnlockAudioLength + CLICK_ENABLE_EXTRA_TIME,
                addButtonInCanvas
            );
        }
        canvasController.setRewardsActive();
    }

    private Action findNextScene()
    {
        bool[] completed = Player.Instance.ScenesCompleted;

        if (completed[ActivityIndex.Scene3]) return sceneLoader.loadCacoIntro;
        if (completed[ActivityIndex.Scene2]) return sceneLoader.loadScene3;
        return sceneLoader.loadScene2;
    }

    private void addButtonInCanvas()
    {
        Button canvasButton = canvasController.addButton();

        canvasButton.onClick.AddListener(() => {
            showReward();
            canvasButton.onClick.RemoveAllListeners();
        });
    }

    private void showReward()
    {
        canvasController.removeLockedEffect();
        audioController.sceneCompletedSound();
        this.InvokeAfter(NEXT_SCENE_DELAY, loadNextScene);
    }
}
