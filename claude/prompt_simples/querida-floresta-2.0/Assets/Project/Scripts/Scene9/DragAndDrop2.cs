using UnityEngine;
using UnityEngine.EventSystems;

// Item that takes the size of the slot while it is being dragged
public class DragAndDrop2 : DragAndDrop
{
    [SerializeField] private RectTransform slotSize;
    private Vector2 originalSize;

    protected override void Awake()
    {
        base.Awake();
        originalSize = rectTransform.sizeDelta;
    }

    public override void OnBeginDrag(PointerEventData eventData)
    {
        base.OnBeginDrag(eventData);
        rectTransform.sizeDelta = slotSize.sizeDelta;
    }

    protected override void returnToOriginalPosition()
    {
        base.returnToOriginalPosition();
        rectTransform.sizeDelta = originalSize;
    }
}
