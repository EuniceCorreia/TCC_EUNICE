using UnityEngine;
using UnityEngine.UI;

// The player must click on the wave; every other click counts as a miss
public class Scene6Controller : MonoBehaviour
{
    private const float INTRO_AUDIO_LENGTH = 10f;
    private const float SCENE_COMPLETED_DELAY = 3f;
    private const float NEXT_SCENE_DELAY = 13f;
    private const float WAVE_SPEED = 2f;
    private const float ARRIVAL_DISTANCE = 0.001f;

    [SerializeField] private Button wave;
    [SerializeField] private GameObject waveObject, bgAfter, target;
    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private Scene6CanvasController canvasController;
    [SerializeField] private Scene6NarratorController narratorController;
    private bool clicked;

    void Start()
    {
        canvasController.showBackgroundCover();
        narratorController.playIntroductionAudio();
        this.InvokeAfter(INTRO_AUDIO_LENGTH, canvasController.hideBackgroundCover);

        wave.onClick.AddListener(onWaveClicked);
    }

    private void onWaveClicked()
    {
        clicked = true;
        // The click on the wave was also counted as a miss in Update()
        ApplicationModel.Scene6Misses--;

        canvasController.showBackgroundCover();
        wave.onClick.RemoveAllListeners();

        this.InvokeAfter(SCENE_COMPLETED_DELAY, narratorController.playSceneCompletedAudio);
        this.InvokeAfter(NEXT_SCENE_DELAY, sceneLoader.loadScene7);

        sheetsController.CompleteActivity(ActivityIndex.Scene6);
    }

    private void Update()
    {
        Transform waveTransform = waveObject.transform;
        Vector3 targetPosition = target.transform.position;

        if (clicked) {
            waveTransform.position = Vector3.MoveTowards(
                waveTransform.position, targetPosition, WAVE_SPEED * Time.deltaTime
            );
        }

        if (Vector3.Distance(waveTransform.position, targetPosition) < ARRIVAL_DISTANCE)
            bgAfter.SetActive(true);

        if (Input.GetMouseButtonDown(0) && !clicked)
            ApplicationModel.Scene6Misses++;
    }
}
