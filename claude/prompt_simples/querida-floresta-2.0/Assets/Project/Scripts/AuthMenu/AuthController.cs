using UnityEngine;
using UnityEngine.UI;

public class AuthController : MonoBehaviour
{
    private const float MAIN_MENU_DELAY = 2f;

    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private WebCamController webCamController;
    [SerializeField] private GameObject buttonsObj, noConnectionObj, webCamObj;
    [SerializeField] private Text quitButtonTxt;
    private bool readQr;

    void Start()
    {
        string errorMessage;
        if (!sheetsController.TryStartSheets(out errorMessage))
            ErrorMode(errorMessage);
    }

    public void ReadQrMode()
    {
        readQr = true;
        buttonsObj.SetActive(false);
        webCamObj.SetActive(true);
        quitButtonTxt.text = "VOLTAR";
        webCamController.StartWebCam();
    }

    public void ErrorMode(string msg)
    {
        buttonsObj.SetActive(false);
        webCamObj.SetActive(false);
        noConnectionObj.GetComponentInChildren<Text>().text = msg;
        noConnectionObj.SetActive(true);
    }

    public bool LoadPlayer(string id)
    {
        var data = sheetsController.FindEntry(id);
        if (data == null) return false;

        Player.Instance.LoadData(data);
        this.InvokeAfter(MAIN_MENU_DELAY, sceneLoader.loadMainMenu);
        return true;
    }

    public void QuitButtonAction()
    {
        if (readQr) {
            webCamController.StopCam();
            sceneLoader.loadAuthMenu();
        }
        else sceneLoader.quitGame();
    }
}
