using UnityEngine;
using UnityEngine.SceneManagement;

// Public methods are bound to buttons in the Inspector: keep their names.
public class SceneLoader : MonoBehaviour
{
    // Build indexes (File > Build Settings)
    private const int AUTH_MENU = 0;
    private const int MAIN_MENU = 1;
    private const int REGISTER_MENU = 2;
    private const int SCENE_1 = 3;
    private const int SCENE_2 = 4;
    private const int SCENE_3 = 5;
    private const int PLAYERS_FOREST = 6;
    private const int SCENE_SELECTION = 7;
    private const int CREDITS = 8;
    private const int STATISTICS = 9;
    private const int SCENE_4 = 10;
    private const int SCENE_5 = 11;
    private const int SCENE_6 = 12;
    private const int SCENE_7 = 13;
    private const int SCENE_8 = 14;
    private const int SCENE_9 = 15;
    private const int QUIZ_2 = 16;
    private const int CONNECT_FIGURES = 17;
    private const int CACO_INTRO = 18;

    public void loadAuthMenu() { SceneManager.LoadScene(AUTH_MENU); }
    public void loadMainMenu() { SceneManager.LoadScene(MAIN_MENU); }
    public void loadRegisterMenu() { SceneManager.LoadScene(REGISTER_MENU); }
    public void loadScene1() { SceneManager.LoadScene(SCENE_1); }
    public void loadScene2() { SceneManager.LoadScene(SCENE_2); }
    public void loadScene3() { SceneManager.LoadScene(SCENE_3); }
    public void loadPlayersForest() { SceneManager.LoadScene(PLAYERS_FOREST); }
    public void loadSceneSelection() { SceneManager.LoadScene(SCENE_SELECTION); }
    public void loadCredits() { SceneManager.LoadScene(CREDITS); }
    public void loadStatisticsScreen() { SceneManager.LoadScene(STATISTICS); }
    public void loadScene4() { SceneManager.LoadScene(SCENE_4); }
    public void loadScene5() { SceneManager.LoadScene(SCENE_5); }
    public void loadScene6() { SceneManager.LoadScene(SCENE_6); }
    public void loadScene7() { SceneManager.LoadScene(SCENE_7); }
    public void loadScene8() { SceneManager.LoadScene(SCENE_8); }
    public void loadScene9() { SceneManager.LoadScene(SCENE_9); }
    public void loadQuiz2() { SceneManager.LoadScene(QUIZ_2); }
    public void loadConnectFigures() { SceneManager.LoadScene(CONNECT_FIGURES); }
    public void loadCacoIntro() { SceneManager.LoadScene(CACO_INTRO); }

    // After activities 1-3: the first completion shows the new reward in the
    // forest; replays go back to the activity selection.
    public void loadAfterActivity(bool wasAlreadyCompleted)
    {
        if (wasAlreadyCompleted) loadSceneSelection();
        else loadPlayersForest();
    }

    public void quitGame()
    {
        #if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
        #endif
        Application.Quit();
    }
}
