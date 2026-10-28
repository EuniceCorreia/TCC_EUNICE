using UnityEngine;
using UnityEngine.UI;

public class MainMenuController : MonoBehaviour
{
    private const float AFTER_SPEECH_DELAY = 1f;
    private const string SPEAKING_PARAMETER = "isSpeaking";

    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private Button startButton, statisticsButton;
    [SerializeField] private GameObject buttonsObj, toco, caco;
    [SerializeField] private NarratorMMController narratorController;
    [SerializeField] private Animator animatorCaco;

    void Start()
    {
        bool hasPlayedBefore =
            Player.Instance.ScenesCompleted[ActivityIndex.Scene1];

        statisticsButton.interactable = hasPlayedBefore;

        if (hasPlayedBefore) {
            startButton.GetComponentInChildren<Text>().text = "ATIVIDADES";
            startButton.onClick.AddListener(sceneLoader.loadSceneSelection);
        }
        else startButton.onClick.AddListener(startNewGame);
    }

    // The first time, the narrator presents the game before scene 1
    private void startNewGame()
    {
        bool[] isFirstTime = ApplicationModel.IsFirstTimeInActivity;

        if (!isFirstTime[ActivityIndex.Scene1]) {
            sceneLoader.loadScene1();
            return;
        }

        isFirstTime[ActivityIndex.Scene1] = false;
        HideButtonsPlaySpeech(false);
        this.InvokeAfter(
            narratorController.SpeechAudioLength + AFTER_SPEECH_DELAY,
            sceneLoader.loadScene1
        );
    }

    private void showButtons()
    {
        buttonsObj.SetActive(true);
        toco.SetActive(true);
        caco.SetActive(true);
    }

    // Called by buttons (BtSpeech): Toco or Caco presents the game
    public void HideButtonsPlaySpeech(bool isCaco)
    {
        float speechLength;

        buttonsObj.SetActive(false);

        if (isCaco) {
            speechLength = narratorController.playSpeechAudioCaco();
            toco.SetActive(false);
            animatorCaco.SetBool(SPEAKING_PARAMETER, true);
            this.InvokeAfter(
                speechLength,
                () => animatorCaco.SetBool(SPEAKING_PARAMETER, false)
            );
        }
        else {
            speechLength = narratorController.playSpeechAudio();
            caco.SetActive(false);
        }

        this.InvokeAfter(speechLength + AFTER_SPEECH_DELAY, showButtons);
    }

    public void QuitButtonAction()
    {
        Player.Instance.ClearData();
        sceneLoader.loadAuthMenu();
    }
}
