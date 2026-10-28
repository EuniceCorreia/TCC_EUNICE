using UnityEngine;
using UnityEngine.UI;

public class CanvasS1Controller : MonoBehaviour
{
    private struct RectLayout
    {
        public readonly float left, top, right, bottom;
        public readonly Vector2 anchorMin, anchorMax;

        public RectLayout(
            float left, float top, float right, float bottom,
            Vector2 anchorMin, Vector2 anchorMax)
        {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            this.anchorMin = anchorMin;
            this.anchorMax = anchorMax;
        }
    }

    // Toucan beside the level sign
    private static readonly RectLayout DEFAULT_TOUCAN_LAYOUT = new RectLayout(
        -0.000289917f, 0.08061218f, 0.7796173f, -0.7994232f,
        new Vector2(0f, 0.319f), new Vector2(0.2241268f, 0.61f)
    );
    // Toucan in the center, above the try again button
    private static readonly RectLayout TRY_AGAIN_TOUCAN_LAYOUT = new RectLayout(
        0.478302f, 0.594101f, 0.7182922f, 0.1781006f,
        new Vector2(0.3382536f, 0.355f), new Vector2(0.6632535f, 0.776826f)
    );

    [SerializeField] private GameObject backgroundCoverObj, toucanObj,
    levelTxtObj, nextLevelBtnObj, quitBtnObj, helpBtnObj, startBtnObj,
    tryAgainBtnObj, levelSignObj, mouseObj;
    [SerializeField] private Text cloudQuantityTxt;

    private static void setActive(bool isActive, params GameObject[] objects)
    {
        foreach (GameObject obj in objects) obj.SetActive(isActive);
    }

    public void enableTryAgainButton() // Invoked by Scene1Controller
    {
        tryAgainBtnObj.GetComponent<Button>().interactable = true;
    }

    public void showNextLevelButton() // Invoked by Scene1Controller
    {
        nextLevelBtnObj.SetActive(true);
    }

    public void showButtons() // Invoked by Scene1Controller
    {
        setActive(true, startBtnObj, helpBtnObj, quitBtnObj);
    }

    public void hideButtons()
    {
        setActive(false, startBtnObj, helpBtnObj, quitBtnObj);
    }

    public void disableStartInterface() // Called by Button (btStart)
    {
        hideButtons();
        levelSignObj.SetActive(false);
    }

    public void updateLevelTxt(int level)
    {
        levelTxtObj.GetComponent<Text>().text = "Fase " + (level + 1);
    }

    private void changeToucanRect(RectLayout layout)
    {
        RectTransform rect = toucanObj.GetComponent<Image>().rectTransform;

        rect.SetOffsets(layout.left, layout.top, layout.right, layout.bottom);
        rect.anchorMin = layout.anchorMin;
        rect.anchorMax = layout.anchorMax;
    }

    public void changeQuantityTxt(int quantity)
    {
        cloudQuantityTxt.text = quantity.ToString();
    }

    public void resetInterface()
    {
        tryAgainBtnObj.GetComponent<Button>().interactable = false;
        setActive(
            false, backgroundCoverObj, tryAgainBtnObj, nextLevelBtnObj, mouseObj
        );
        changeToucanRect(DEFAULT_TOUCAN_LAYOUT);
        changeQuantityTxt(0);
        showButtons();
        setActive(true, levelSignObj, levelTxtObj);
    }

    public void changeToTryAgainInterface()
    {
        setActive(false, quitBtnObj, helpBtnObj, levelTxtObj);
        changeToucanRect(TRY_AGAIN_TOUCAN_LAYOUT);
        setActive(true, backgroundCoverObj, tryAgainBtnObj);
    }

    public void changeToHelpInterface()
    {
        disableStartInterface();
        mouseObj.SetActive(true);
    }
}
