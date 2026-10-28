using UnityEngine;

public class Scene4CanvasController : DragAndDropCanvasController
{
    [SerializeField] private Animator landslideAnim;

    public void landslide()
    {
        landslideAnim.SetBool("Win", true);
    }
}
