using UnityEngine;
using UnityEngine.EventSystems;

// UI item that follows the pointer and goes back to its original position
// unless it was dropped on its DropSlot
public abstract class DraggableItem : MonoBehaviour,
    IBeginDragHandler, IDragHandler, IEndDragHandler
{
    [SerializeField] protected AudioController audioController;
    [SerializeField] protected Canvas canvas;
    protected RectTransform rectTransform;
    protected CanvasGroup canvasGroup;
    private Vector2 originalPosition;

    // Set by the DropSlot, which receives the drop before OnEndDrag
    public bool IsPlaced { get; set; }

    protected virtual void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
        canvasGroup = GetComponent<CanvasGroup>();
        originalPosition = rectTransform.anchoredPosition;
    }

    public virtual void OnBeginDrag(PointerEventData eventData)
    {
        canvasGroup.blocksRaycasts = false;
        audioController.buttonClickedSound();
    }

    public virtual void OnDrag(PointerEventData eventData)
    {
        rectTransform.anchoredPosition += eventData.delta / canvas.scaleFactor;
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        if (IsPlaced) lockInPlace();
        else returnToOriginalPosition();
    }

    protected virtual void returnToOriginalPosition()
    {
        canvasGroup.blocksRaycasts = true;
        rectTransform.anchoredPosition = originalPosition;
    }

    protected virtual void lockInPlace()
    {
        canvasGroup.interactable = false;
    }
}
