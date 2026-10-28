using UnityEngine;
using UnityEngine.UI;

// Canvas of the drag and drop scenes (4, 8 and 9)
public abstract class DragAndDropCanvasController : CanvasController
{
    private static readonly Vector3 TRY_AGAIN_CACO_POSITION =
        new Vector3(0f, 0.75f, 0f);
    [SerializeField] protected Button tryAgainButton;
    [SerializeField] protected RectTransform caco;

    public virtual void changeToTryAgainInterface()
    {
        caco.position = TRY_AGAIN_CACO_POSITION;
        showDimmedBackgroundCover();
        tryAgainButton.gameObject.SetActive(true);
    }
}
