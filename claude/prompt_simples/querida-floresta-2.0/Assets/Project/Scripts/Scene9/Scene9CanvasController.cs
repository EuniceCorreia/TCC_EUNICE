using UnityEngine;

public class Scene9CanvasController : DragAndDropCanvasController
{
    private Animator animator;

    private void Start()
    {
        animator = GetComponent<Animator>();
    }

    public override void changeToTryAgainInterface()
    {
        // Draws cover, button and Caco above the dragged items
        backgroundCoverObj.transform.SetAsLastSibling();
        tryAgainButton.transform.SetAsLastSibling();
        caco.SetAsLastSibling();
        base.changeToTryAgainInterface();
    }

    public void windPreventionAnimation()
    {
        animator.SetTrigger("wind");
    }
}
