using UnityEngine;
using UnityEngine.UI;

// Canvas of the scenes with a help sign and a toucan that asks the player to
// try again (scenes 2, 5, 6 and 7)
public abstract class HelpAndTryAgainCanvasController : CanvasController
{
    [SerializeField] private Button tryAgainButton;
    [SerializeField] private GameObject toucanObj, tryAgainToucanObj,
    helpBtnObj, quitBtnObj, helpSignObj;

    public void changeToTryAgainInterface()
    {
        toucanObj.SetActive(false);
        showDimmedBackgroundCover();
        tryAgainToucanObj.SetActive(true);
        tryAgainButton.gameObject.SetActive(true);
    }

    private void setHelpInterfaceActive(bool isHelpInterfaceOn)
    {
        helpBtnObj.SetActive(!isHelpInterfaceOn);
        quitBtnObj.SetActive(!isHelpInterfaceOn);
        helpSignObj.SetActive(isHelpInterfaceOn);
    }

    public void changeToHelpInterface()
    {
        showBackgroundCover();
        setHelpInterfaceActive(true);
    }

    public void leaveHelpInterface()
    {
        setHelpInterfaceActive(false);
        hideBackgroundCover();
    }

    void Start()
    {
        tryAgainButton.onClick.AddListener(tryAgain);
    }
}
