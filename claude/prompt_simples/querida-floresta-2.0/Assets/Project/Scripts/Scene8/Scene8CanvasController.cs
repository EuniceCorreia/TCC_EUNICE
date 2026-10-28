using UnityEngine;
using UnityEngine.UI;

public class Scene8CanvasController : DragAndDropCanvasController
{
    [SerializeField] private GameObject rock;
    [SerializeField] private Sprite rockAfter;
    [SerializeField] private Animator animator;

    private void Awake()
    {
        animator = GetComponent<Animator>();
    }

    // Invoked by an event of the erosion animation
    public void changeRock()
    {
        rock.GetComponent<Image>().sprite = rockAfter;
    }

    public void erosionAnimation()
    {
        animator.SetTrigger("Erode");
    }
}
