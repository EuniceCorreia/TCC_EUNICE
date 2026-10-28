using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

// Base of the scene canvases: the background cover blocks clicks while the
// narrator is speaking or when the player has to try again.
public abstract class CanvasController : MonoBehaviour
{
    private static readonly Color DIMMED_COVER_COLOR = new Color(0f, 0f, 0f, 0.5f);
    [SerializeField] protected GameObject backgroundCoverObj;

    public void showBackgroundCover()
    {
        backgroundCoverObj.SetActive(true);
    }

    public void hideBackgroundCover()
    {
        backgroundCoverObj.SetActive(false);
    }

    protected void showDimmedBackgroundCover()
    {
        backgroundCoverObj.GetComponent<Image>().color = DIMMED_COVER_COLOR;
        showBackgroundCover();
    }

    // Reloads the current scene. Called by Button (btTryAgain)
    public void tryAgain()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
