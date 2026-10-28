using UnityEngine;
using UnityEngine.EventSystems;

public abstract class DraggableItem : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
{
    // Keep these names so existing scene and prefab assignments remain valid.
    [SerializeField] private AudioController audioController;
    [SerializeField] private Canvas canvas;
    public bool correct;

    private CanvasGroup canvasGroup;
    private Vector2 originalPosition;
    protected RectTransform ItemTransform { get; private set; }

    protected virtual void Awake()
    {
        ItemTransform = GetComponent<RectTransform>();
        canvasGroup = GetComponent<CanvasGroup>();
        originalPosition = ItemTransform.anchoredPosition;
        correct = false;
    }

    public virtual void OnBeginDrag(PointerEventData eventData)
    {
        canvasGroup.blocksRaycasts = false;
        audioController.buttonClickedSound();
    }

    public virtual void OnDrag(PointerEventData eventData)
    {
        ItemTransform.anchoredPosition += eventData.delta / canvas.scaleFactor;
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        if (correct)
        {
            canvasGroup.interactable = false;
            OnAcceptedDrop();
            return;
        }

        canvasGroup.blocksRaycasts = true;
        ItemTransform.anchoredPosition = originalPosition;
        OnRejectedDrop();
    }

    protected virtual void OnAcceptedDrop() { }
    protected virtual void OnRejectedDrop() { }
}
